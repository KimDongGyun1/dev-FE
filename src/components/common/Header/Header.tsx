import React from 'react';

function Header({ title }: { title: string }) {
	return (
		<>
			<header>{title}</header>
		</>
	);
}

export default Header;
