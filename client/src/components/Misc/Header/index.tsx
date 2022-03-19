import React from 'react';
import { Container, Row, Col } from 'reactstrap';

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
			<Container>
				<Row className="align-itemscenter text-center">
					<Col>
						<h1 className="display-4 mt-5 mb-2">{title}</h1>
					</Col>
				</Row>
			</Container>
		</header>
	);
};

export default Header;
