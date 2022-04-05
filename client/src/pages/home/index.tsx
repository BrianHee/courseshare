import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PageInterface from '../../interfaces/page';
import NavBar from '../../components/NavBar';
import { UserContext } from '../../context';
import ICourse from '../../interfaces/course';
import config from '../../config/config';
import logging from '../../config/logging';
import { Link } from 'react-router-dom';
import CoursePreview from '../../components/CoursePreview';
import IUser from '../../interfaces/user';

import styles from './styles.module.scss';

const HomePage: React.FunctionComponent<PageInterface> = (props) => {
	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	const [courses, setCourses] = useState<ICourse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [renderCourses, setRender] = useState<any>('');
	const [error, setError] = useState<string>('');

	const navigate = useNavigate();

	useEffect(() => {
		getAllCourses();
		console.log(state);
	}, [state]);

	const getAllCourses = async () => {
		if (state._id && state._id != 'temp') {
			try {
				const response = await axios.get(`${config.server.url}/course/user/${state._id}`);

				if (response.status === 200) {
					let courses = response.data.courses;
					courses.sort((x: ICourse, y: ICourse) => y.updatedAt.localeCompare(x.updatedAt));
					setCourses(courses);
				} else {
					setError('Unable to retrieve courses');
				}
			} catch (error) {
				logging.error(error);
				setError('Unable to fetch courses');
			} finally {
				setLoading(false);
			}
		}
	};

	const navigateNewCourse = () => {
		navigate('/create');
	};

	useEffect(() => {
		if (courses.length === 0) {
			setRender(
				<div className={styles['empty-message']}>
					It's eerily empty here 👀 ...{' '}
					<Link className={styles['link']} to="/create">
						Get started
					</Link>
				</div>
			);
		} else {
			setRender(
				courses.map((course, index) => {
					return (
						<div key={index}>
							<CoursePreview
								_id={course._id}
								author={(course.author as IUser).firstName}
								title={course.title}
								createdAt={course.createdAt}
								updatedAt={course.updatedAt}
							/>
						</div>
					);
				})
			);
		}
	}, [courses]);

	return (
		<div className={styles['container']}>
			<NavBar />
			<div className={styles['greeting-container']}>{state._id ? <h1>Hello, {state.firstName}!</h1> : <></>}</div>
			<div className={styles['tab-container']}>
				<div className={styles['tab']}>
					<span>Courses</span>
				</div>
				<div>
					<button className={styles['create-button']} type="button" onClick={navigateNewCourse}>
						+ New Course
					</button>
				</div>
			</div>
			<div className={styles['courses-container']}>
				{renderCourses}
				{error && error}
			</div>
		</div>
	);
};

export default HomePage;
