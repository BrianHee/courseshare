import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import config from '../../config/config';
import logging from '../../config/logging';
import { UserContext } from '../../context';
import ICourse from '../../interfaces/course';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NavBar from '../../components/NavBar';
import IUser from '../../interfaces/user';

import styles from './styles.module.scss';
import CourseNav from './Components/CourseNav';
import ILesson from '../../interfaces/lesson';

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
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setCourse(response.data.course);
			} else {
				logging.error('Unable to set course');
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
			} else {
				setError('Unable to find course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	const getLesson = async () => {
		try {
			const response = await axios.get(`${config.server.url}/lesson/${lessonID}`);

			if (response.status === 200) {
				setLesson(response.data.lesson);
			} else {
				logging.error('Unable to find lesson');
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
