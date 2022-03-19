import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import config from '../config/config';
import logging from '../config/logging';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Container, Modal, ModalBody, ModalFooter } from 'reactstrap';
import NavBar from '../components/Misc/NavBar';
import { ModalHeader } from 'reactstrap';
import Header from '../components/Misc/Header';
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
		if (courseID) {
			setId(courseID);
		} else {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		if (_id !== '') {
			getCourse();
		}
	}, [_id]);

	const getCourse = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${_id}`);

			if (response.status === 200) {
				setCourse(response.data.course);
			} else {
				setError('Unable to retrieve course');
			}
		} catch (error) {
			setError('Unable to retrieve course');
		} finally {
			setLoading(false);
		}
	};

	const deleteCourse = async () => {
		setDeleting(true);

		try {
			const response = await axios.delete(`${config.server.url}/course/${_id}`);

			if (response.status === 201) {
				navigate('/home');
			} else {
				setError('Unable to delete course');
				setDeleting(false);
			}
		} catch (error) {
			setError('Unable to delete course');
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
						<Button color="secondary" onClick={() => setModal(false)}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<Header title={course.title}>
					<p className="text-white">{(course.author as IUser).firstName}</p>
				</Header>
				<Container className="mt-5">
					{state._id === (course.author as IUser)._id && (
						<Container fluid className="p-0">
							<Button color="info" className="mr-2" tag={Link} to={`/edit/${course._id}`}>
								Edit
							</Button>
							<Button color="danger" onClick={() => setModal(true)}>
								Delete
							</Button>
						</Container>
					)}
					{error}
					<div className="content-container" dangerouslySetInnerHTML={{ __html: course.description }} />
				</Container>
			</Container>
		);
	} else {
		return <Link to="/home" />;
	}
};

export default CoursePage;
