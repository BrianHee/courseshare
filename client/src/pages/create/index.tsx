import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';
import config from '../../config/config';
import logging from '../../config/logging';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import NavBar from '../../components/NavBar';

const CreatePage: React.FunctionComponent = () => {
	const [title, setTitle] = useState<string>('');
	const [description, setDesc] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const [state, setState] = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {}, []);

	const createCourse = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (title === '' || description === '') {
			setError('Please fill out all required forms');
			return;
		}
		setError('');
		try {
			const response = await axios.post(`${config.server.url}/course/create`, {
				title,
				description,
				author: state._id
			});

			if (response.status === 201) {
				//not consoling the response
				setSuccess('Course succesfully created');
				navigate(`/edit/${response.data._id}`);
			}
		} catch (error) {
			logging.error(error);
		}
	};

	return (
		<div className={styles.container}>
			<NavBar />
			<div className={styles['form-wrapper']}>
				<form>
					<div className={styles.label}>Course title</div>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
					<div className={styles.label}>Course description</div>
					<textarea value={description} onChange={(e) => setDesc(e.target.value)}></textarea>
					<div className={styles.error}>{error}</div>
					<button type="button" onClick={createCourse}>
						Create Course
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePage;
