import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context';

import logo from '../../assets/logo.png';
import styles from './styles.module.scss';

export interface NavPropsInterface {}

const NavBar: React.FunctionComponent<NavPropsInterface> = (props) => {
	const [state, setState] = useContext(UserContext);

	const navigate = useNavigate();

	const handleLogout = () => {
		setState({
			_id: '',
			firstName: '',
			lastName: '',
			email: ''
		});
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<nav className={styles['navbar']}>
			<div className={styles['container']}>
				<div className={styles['logo-container']}>
					<Link to="/home">
						<img src={logo} alt="courseshare" />
					</Link>
				</div>
				<div className={styles['logout-container']}>
					{state._id && (
						<button className={styles['logout']} type="button" onClick={handleLogout}>
							Sign Out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
