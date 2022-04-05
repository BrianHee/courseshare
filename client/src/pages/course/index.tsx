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
	const [lesson, setLesson] = useState<ILesson | null>();
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
			console.log('catch entered');
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
		if (lessonID) {
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
		}
	};

	useEffect(() => {
		getNavLessons();
		getCourse();
	}, []);

	useEffect(() => {
		getLesson();
		if (!lessonID) {
			setLesson(null);
		}
	}, [lessonID]);

	if (course) {
		return (
			<div>
				<NavBar />
				<CourseNav lessons={navLessons} />
				<div className={styles['content-container']}>
					{lesson ? (
						<div>
							<div dangerouslySetInnerHTML={{ __html: lesson.content }} />
						</div>
					) : (
						<div>
							<div>{course.title}</div>
							<div
								className={styles['html-content']}
								dangerouslySetInnerHTML={{ __html: course.description }}
							/>
						</div>
					)}
				</div>
			</div>
		);
	} else {
		return <Link to="/home" />;
	}
};

export default CoursePage;
