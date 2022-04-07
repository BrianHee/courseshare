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
	const [picture, setPicture] = useState<string>('');
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
				author: state._id,
				picture
			});

			if (response.status === 201) {
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
					<div className={styles.label}>Title</div>
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
					<div className={styles.label}>Description</div>
					<textarea value={description} onChange={(e) => setDesc(e.target.value)} />
					<div className={styles.label}>Picture</div>
					<input placeholder="URL" type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
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
