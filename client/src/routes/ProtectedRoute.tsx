import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';
import NavBar from '../components/NavBar';
import { UserContext } from '../context';

export const ProtectedRoute = (props: any) => {
	const [state] = useContext(UserContext);

	if (state._id === 'temp') {
		return (
			<div>
				<NavBar />
				<LoadingComponent />
			</div>
		);
	} else if (!state._id) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};
