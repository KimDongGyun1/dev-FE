import React from 'react';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

function Header({
	title,
	addGoBackButton,
	rightComponent,
}: {
	title: string;
	addGoBackButton?: boolean;
	rightComponent?: any;
}) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.headerContainer}>
			<header className={styles.commonHeader}>
				<span>
					{addGoBackButton && (
						<button onClick={() => goBack()}>
							<MdOutlineNavigateBefore size={24} color='#736ef3' />
						</button>
					)}
				</span>
				<span>{title}</span>
				<span>{rightComponent}</span>
			</header>
		</div>
	);
}

export default Header;
