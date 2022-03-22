import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import config from '../config/config';
import logging from '../config/logging';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NavBar from '../components/Misc/NavBar';
import Header from '../components/Misc/Header';
import IUser from '../interfaces/user';

import '../styles/coursepage.scss';
import CourseNav from '../components/CourseView/CourseNav';
import ILesson from '../interfaces/lesson';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

const CoursePage: React.FunctionComponent<any> = (props) => {
	const [_id, setId] = useState<string>('');
	const [course, setCourse] = useState<ICourse | null>(null);
	const [navLessons, setNavLessons] = useState<ILessons[]>([]);
	const [lesson, setLesson] = useState<ILesson>();
	const [error, setError] = useState<string>('');

	const [state, setState] = useContext(UserContext);
	const { courseID, lessonID } = useParams();
	const navigate = useNavigate();

	const getCourse = async () => {
		console.log('getting course');
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setCourse(response.data.course);
				console.log('setting course');
			} else {
				console.log('Unable to set course');
			}
		} catch (error) {
			logging.error(error);
			navigate('/error');
		}
	};

	const getNavLessons = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setNavLessons(response.data.course.lessons);
				console.log('lessons set:', navLessons);
			} else {
				console.log('Unable to find');
				setError('Unable to find course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	const getLesson = async () => {
		console.log('Getting current lesson');
		try {
			console.log('getting', lessonID);
			const response = await axios.get(`${config.server.url}/lesson/${lessonID}`);
			console.log('response', response);

			if (response.status === 200) {
				setLesson(response.data.lesson);
			} else {
				console.log('Unable to find lesson');
				setError('Unable to find lesson');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	useEffect(() => {
		getNavLessons();
		getCourse();
	}, []);

	useEffect(() => {
		getLesson();
	}, [lessonID]);

	useEffect(() => {
		console.log('Curretn course is:', course);
	}, [course]);

	if (course) {
		if (lesson) {
			return (
				<div>
					<CourseNav lessons={navLessons} />
					<div dangerouslySetInnerHTML={{ __html: lesson.content }} />
				</div>
			);
		} else {
			return (
				<div>
					<CourseNav lessons={navLessons} />
					<div>{course.title}</div>
					<div>{course.description}</div>
				</div>
			);
		}
	} else {
		return <Link to="/home" />;
	}
};

export default CoursePage;
