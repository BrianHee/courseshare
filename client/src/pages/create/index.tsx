import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import NavBar from '../../components/NavBar';

const CreatePage: React.FunctionComponent = () => {
	const [title, setTitle] = useState<string>('');
	const [description, setDesc] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [error, setError] = useState<string>('');

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
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/course/create`, {
				title,
				description,
				author: state._id,
				image
			});

			if (response.status === 201) {
				navigate(`/edit/${response.data._id}`);
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
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
					<textarea
						className={styles.textarea}
						value={description}
						onChange={(e) => setDesc(e.target.value)}
					/>
					<div className={styles.label}>Image</div>
					<input placeholder="URL" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
					<div className={styles.error}>{error}</div>
					<button className={styles.button} type="button" onClick={createCourse}>
						Create Course
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePage;
