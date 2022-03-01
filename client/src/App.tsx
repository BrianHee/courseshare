import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './config/routes';

export interface AppPropsInterface {}

const Application: React.FunctionComponent<AppPropsInterface> = (props) => {
	return (
		<Routes>
			{routes.map((route, index) => {
				return <Route key={index} path={route.path} element={(routeProps: any) => <route.component {...routeProps} />} />;
			})}
		</Routes>
	);
};

export default Application;
