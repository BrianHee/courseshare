import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PageInterface from '../../interfaces/page';
import NavBar from '../../components/NavBar';
import { UserContext } from '../../context';
import ICourse from '../../interfaces/course';

import { Link } from 'react-router-dom';
import CoursePreview from '../../components/CoursePreview';

import styles from './styles.module.scss';
import LoadingSpinner from '../../components/LoadingSpinner';

const HomePage: React.FunctionComponent<PageInterface> = (props) => {
	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	const [courses, setCourses] = useState<ICourse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [renderCourses, setRender] = useState<any>('');

	const navigate = useNavigate();

	useEffect(() => {
		getAllCourses();
	}, [state]);

	const getAllCourses = async () => {
		if (state._id && state._id !== 'temp') {
			try {
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/course/user/${state._id}`);

				if (response.status === 200) {
					let courses = response.data.courses;
					courses.sort((x: ICourse, y: ICourse) => y.updatedAt.localeCompare(x.updatedAt));
					setCourses(courses);
				} else {
					navigate('/error');
				}
			} catch (error) {
				navigate('/error');
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
				<div className={styles['courses-container']}>
					{courses.map((course, index) => {
						return (
							<div key={index}>
								<CoursePreview _id={course._id} title={course.title} image={course.image} />
							</div>
						);
					})}
				</div>
			);
		}
	}, [courses]);

	return (
		<div className={styles.container}>
			<NavBar />
			<div className={styles['nav-placeholder']}></div>
			<div className={styles.wrapper}>
				<div className={styles['greeting-container']}>
					{state._id ? <h1>Hello, {state.firstName}!</h1> : <h1>Hello!</h1>}
				</div>
				<div className={styles['tab-container']}>
					<div className={styles['tab']}>
						<span>Courses</span>
					</div>
					<div className={styles['button-container']}>
						<button className={styles['create-button']} type="button" onClick={navigateNewCourse}>
							+ New Course
						</button>
					</div>
				</div>
				{loading ? <LoadingSpinner /> : <div className={styles['render-container']}>{renderCourses}</div>}
			</div>
		</div>
	);
};

export default HomePage;
