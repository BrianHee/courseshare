import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './config/routes';

import { ProtectedRoute } from './routes/ProtectedRoute';

export interface AppPropsInterface {}

const Application: React.FunctionComponent<AppPropsInterface> = (props) => {
	// const [userState, userDispatch ] = useReducer
	return (
		<Routes>
			{routes.map((route, index) => {
				if (route.auth) {
					return (
						<Route
							key={index}
							path={route.path}
							element={<ProtectedRoute />}
						>
							<Route
								key={index}
								path={route.path}
								element={<route.component />}
							/>
						</Route>
					);
				} else {
					return (
						<Route
							key={index}
							path={route.path}
							element={<route.component />}
						/>
					);
				}
			})}
		</Routes>
	);
};

export default Application;

// routeProps as props for element?
