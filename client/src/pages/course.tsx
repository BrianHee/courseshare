import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import config from '../config/config';
import logging from '../config/logging';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Container, Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavBar from '../components/NavBar';
import { ModalHeader } from 'reactstrap';
import Header from '../components/Header';
import IUser from '../interfaces/user';

import '../styles/coursepage.scss';

const CoursePage: React.FunctionComponent<any> = (props) => {
	const [_id, setId] = useState<string>('');
	const [course, setCourse] = useState<ICourse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	const [modal, setModal] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);

	const [state, setState] = useContext(UserContext);
	const { courseID } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		console.log(state);
		console.log('Course page loaded');
		if (courseID) {
			setId(courseID);
			console.log(courseID, 'courseID set');
		} else {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		if (_id !== '') {
			console.log('getting course');
			getCourse();
		}
	}, [_id]);

	const getCourse = async () => {
		try {
			const response = await axios.get(
				`${config.server.url}/courses/${_id}`
			);

			if (response.status === 200) {
				setCourse(response.data.course);
				console.log(response.data.course.author);
			} else {
				setError('Unable to retrieve course');
				console.log('getCourse error');
			}
		} catch (error) {
			setError('Unable to retrieve course');
			console.log('getCourse catch entered');
		} finally {
			setLoading(false);
		}
	};

	const deleteCourse = async () => {
		setDeleting(true);

		try {
			const response = await axios.delete(
				`${config.server.url}/courses/${_id}`
			);

			if (response.status === 201) {
				navigate('/home');
			} else {
				setError('Unable to delete course');
				console.log('deleteCourse error');
				setDeleting(false);
			}
		} catch (error) {
			setError('Unable to delete course');
			console.log('deleteCourse catch entered');
			setDeleting(false);
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (course) {
		return (
			<Container fluid className="p-0">
				<NavBar />
				<Modal isOpen={modal}>
					<ModalHeader>Delete</ModalHeader>
					<ModalBody>
						{deleting ? <p>Loading...</p> : 'Are you sure?'}
						<p>{error}</p>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={() => deleteCourse()}>
							Delete
						</Button>
						<Button
							color="secondary"
							onClick={() => setModal(false)}
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<Header
					image={course.picture || undefined}
					headline={course.headline}
					title={course.title}
				>
					<p className="text-white">
						{(course.author as IUser).firstName}
					</p>
				</Header>
				<Container className="mt-5">
					{state._id === (course.author as IUser)._id && (
						<Container fluid className="p-0">
							<Button
								color="info"
								className="mr-2"
								tag={Link}
								to={`/edit/${course._id}`}
							>
								Edit
							</Button>
							<Button
								color="danger"
								onClick={() => setModal(true)}
							>
								Delete
							</Button>
						</Container>
					)}
					{error}
					<div
						className="content-container"
						dangerouslySetInnerHTML={{ __html: course.content }}
					/>
				</Container>
			</Container>
		);
	} else {
		return <Link to="/home" />;
	}
};

export default CoursePage;
