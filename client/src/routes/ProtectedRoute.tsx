import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context';

export const ProtectedRoute = (props: any) => {
	const [state] = useContext(UserContext);

	return state._id ? <Outlet /> : <Navigate to="/" />;
};
