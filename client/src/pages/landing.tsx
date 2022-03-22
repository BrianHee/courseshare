import React from 'react';
import Header from '../components/Misc/Header';
import Navigation from '../components/Misc/Navigation';

const LandingPage: React.FunctionComponent<any> = (props) => {
	return (
		<div>
			<Navigation />
			<Header title="Course builder" />
			<div className="mt-5">Course stuff here</div>
		</div>
	);
};

export default LandingPage;
