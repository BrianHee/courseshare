import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export interface HeaderPropsInterface {
	height?: string;
	image?: string;
	title: string;
	headline: string;
}

const Header: React.FunctionComponent<HeaderPropsInterface> = (props) => {
	const { children, height, image, headline, title } = props;

	const headerStyle = {
		width: '100%',
		height: height
	};

	return (
		<header style={headerStyle}>
			<Container>
				<Row className="align-itemscenter text-center">
					<Col>
						<h1 className="display-4 mt-5 mb-2">{title}</h1>
						<h3 className="mb-5">{headline}</h3>
					</Col>
				</Row>
			</Container>
		</header>
	);
};

export default Header;
