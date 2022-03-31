import React from 'react';
import BlockA from './Components/BlockA';
import BlockB from './Components/BlockB';
import Footer from './Components/Footer';
import LandingNav from './Components/LandingNav';

const LandingPage: React.FunctionComponent<any> = (props) => {
	return (
		<div>
			<LandingNav />
			<BlockA />
			<BlockB />
			<Footer />
		</div>
	);
};

export default LandingPage;
