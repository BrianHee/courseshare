import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import NavBar from '../components/NavBar';
import { UserContext } from '../context';

export const ProtectedRoute = (props: any) => {
	const [state] = useContext(UserContext);

	if (state._id === 'temp') {
		return (
			<div>
				<NavBar />
				<LoadingSpinner />
			</div>
		);
	} else if (!state._id) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};
