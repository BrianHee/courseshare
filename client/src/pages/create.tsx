import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/logging';
import { useNavigate } from 'react-router-dom';

const CreatePage: React.FunctionComponent = () => {
	const [title, setTitle] = useState<string>('');
	const [description, setDesc] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const [state, setState] = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(state._id);
	}, []);

	const createCourse = async () => {
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
			console.log(response);

			if (response.status === 201) {
				console.log(response);
				//not consoling the response
				console.log(response.data._id);
				setSuccess('Course succesfully created');
				navigate(`/edit/${response.data._id}`);
			}
		} catch (error) {
			logging.error(error);
		}
	};

	return (
		<div>
			<form>
				<label>Course Title</label>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
				<br />
				<label>Description</label>
				<input type="text" value={description} onChange={(e) => setDesc(e.target.value)}></input>
				<br />
				<button type="button" onClick={createCourse}>
					<strong>+</strong> Create Course
				</button>
			</form>
			{error && error}
		</div>
	);
};

export default CreatePage;
