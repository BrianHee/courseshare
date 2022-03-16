import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context';

export const ProtectedRoute = (props: any) => {
	const [state] = useContext(UserContext);

	if (state.loading) return <div>Loading...</div>;

	return state._id ? <Outlet /> : <Navigate to="/" />;
};
