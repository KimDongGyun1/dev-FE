import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { addedBook, selectedBook, updatedBook } from '../apis/book';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';

import styles from '../components/BookForm/bookform.module.scss';

import BookFormDetail from '../components/BookForm/BookFormDetail'
import Navigation from '../components/common/Navigation/Navigation';
import BookHeader from '../components/BookForm/BookHeader';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';
import AlertModal from '../components/common/AlertModal/AlertModal';


function BookForm() {
	const userToken = useRecoilValue(userTokenState);
	const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);
	const [alertModalOpen, setAlertModalOpen] = useState(false);
	const [navigateBack, setNavigateBack] = useState(false);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();
	const [bookInfo, setBookInfo] = useState({
		bookDescription: '',
		bookName: '',
		word: 'english',
		meaning: 'korean',
	});

	const { bookId } = useParams();
	const location = useLocation();
	const editPage = location.pathname === `/book/edit/${bookId}`;
	const addPage = location.pathname === '/book/add';



	/** API 연결 */
	let bookData: BookData = {
		name: '',
		description: '',
		start_lang: '',
		end_lang: '',
	};
	type BookData = {
		name: string;
		description: string;
		start_lang: string;
		end_lang: string;
	}
	// 단어장 가져오기
	const getBookList = async () => {
		if (userToken) {
			try {
				if (!bookId) {
					return;
				}
				const response = await selectedBook(bookId, userToken);
				bookData = response.data[0];
				if (response.status === 200) {
					setBookInfo({
						bookDescription: bookData.description,
						bookName: bookData.name,
						word: bookData.start_lang,
						meaning: bookData.end_lang,
					});
				}
			} catch (err) {
				console.log(err);
				alert('단어장 정보를 불러오는데 실패하였습니다.');
			}
		}
	};

	// 단어장 생성 및 수정
	const handleSubmit = async () => {
		if (userToken) {
			if (!bookInfo.bookName) {
				setMessage('단어장 이름을 입력해주세요')
				setAlertModalOpen(true);
				return;
			}
			const data = {
				name: bookInfo.bookName,
				description: bookInfo.bookDescription,
				start_lang: bookInfo.word,
				end_lang: bookInfo.meaning,
			};

			if (addPage) {
				try {
					const response = await addedBook(userToken, data);
					if (response.status === 201) {
						setMessage(`[${bookInfo.bookName}] 생성 완료`)
						setAlertModalOpen(true);
						setNavigateBack(true)
					}
				} catch (err) {
					console.log(err);
				}
			} else if (editPage) {
				try {
					if (!bookId) {
						return;
					}
					const response = await updatedBook(bookId, userToken, data);
					if (response.status === 200) {
						setMessage(`[${bookInfo.bookName}] 수정 완료`)
						setAlertModalOpen(true);
						setNavigateBack(true)
					}
				} catch (err) {
					console.log(err);
					alert('단어장 수정 실패');
				}
			}
		} else {
			setLoginAlertModalOpen(true);
		}
	};

	useEffect(() => {
		if (editPage) {
			getBookList();
		}
	}, [editPage]);

	return (
		<>
			<Navigation></Navigation>
			<main>
				<div className={styles.container}>
					<BookHeader
						addPage={addPage}
						editPage={editPage}
						title='단어장'
						className={
							bookInfo.bookName
								? `${styles.active} ${styles.className}`
								: styles.className
						}
						onButtonClick={handleSubmit}
					/>
					<BookFormDetail
						bookInfo={bookInfo}
						setBookInfo={setBookInfo}
					/>
				</div>
				<AlertModal
					isOpen={alertModalOpen}
					onClose={() => {
						setAlertModalOpen(false);
						if (navigateBack) {
							navigate('/book/list');
						}
					}}
					message={message}
				/>
				{
					loginAlertModalOpen && (
						<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
					)
				}
			</main>
		</>
	);
}

export default BookForm;
