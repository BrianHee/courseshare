import React from 'react';

export interface HeaderPropsInterface {
	title: string;
}

const Header: React.FunctionComponent<HeaderPropsInterface> = (props) => {
	const { children, title } = props;

	const headerStyle = {
		width: '100%'
	};

	return (
		<header style={headerStyle}>
			<div>
				<h1>{title}</h1>
			</div>
		</header>
	);
};

export default Header;
