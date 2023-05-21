import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import styles from './bookform.module.scss'
import { BsJournalBookmark } from 'react-icons/bs';
import { BsArrowDownUp } from 'react-icons/bs';
import { IoLanguageOutline } from 'react-icons/io5';

type BookFormDetailProps = {
    bookInfo: {
        bookName: string;
        bookDescription: string;
        word: string;
        meaning: string;
    };
    setBookInfo: Dispatch<SetStateAction<{
        bookName: string;
        bookDescription: string;
        word: string;
        meaning: string;
    }>>;
}

function BookFormDetail({
    bookInfo,
    setBookInfo,
}: BookFormDetailProps) {

    // start_lang 변경
    const handleToggleLanguage = () => {
        setBookInfo(prevBookInfo => ({
            ...prevBookInfo,
            word: prevBookInfo.meaning,
            meaning: prevBookInfo.word,
        }));
    };

    // 단어장 이름 변경
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBookInfo(prevBookInfo => ({
            ...prevBookInfo,
            bookName: e.target.value,
        }));
    };

    // 단어장 설명 변경
    const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBookInfo(prevBookInfo => ({
            ...prevBookInfo,
            bookDescription: e.target.value,
        }));
    };
    return (
        <>
            <form className={styles.bookForm}>
                <p>
                    <BsJournalBookmark className={styles.icon} />
                    이름 & 설명
                </p>
                <input
                    type='text'
                    placeholder='단어장 이름을 입력해 주세요!'
                    value={bookInfo.bookName || ''}
                    onChange={handleNameChange}
                />
                <textarea
                    placeholder='단어장 설명을 입력해 주세요! (선택)'
                    value={bookInfo.bookDescription}
                    onChange={handleDescChange}
                />
                <p>
                    <IoLanguageOutline className={styles.icon} />
                    언어
                </p>
                <table className={styles.bookLanguage}>
                    <tbody>
                        <tr>
                            <td>단어</td>
                            <td className={styles.language}>{bookInfo.word}</td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleToggleLanguage();
                                    }}
                                >
                                    <BsArrowDownUp className={styles.icon} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>의미</td>
                            <td className={styles.language}>{bookInfo.meaning}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}

export default BookFormDetail;