import React from 'react';
import BlockA from './Components/BlockA';
import BlockB from './Components/BlockB';
import LandingNav from './Components/LandingNav';

const LandingPage: React.FunctionComponent<any> = (props) => {
	return (
		<div>
			<LandingNav />
			<BlockA />
			<BlockB />
		</div>
	);
};

export default LandingPage;
