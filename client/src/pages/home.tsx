import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import PageInterface from '../interfaces/page';
import NavBar from '../components/Misc/NavBar';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import config from '../config/config';
import logging from '../config/logging';
import { Link } from 'react-router-dom';
import CoursePreview from '../components/Misc/CoursePreview';
import IUser from '../interfaces/user';
import LoadComponent from '../components/Misc/Loading';

const HomePage: React.FunctionComponent<PageInterface> = (props) => {
	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	const [courses, setCourses] = useState<ICourse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [render, setRender] = useState<any>('');
	const [error, setError] = useState<string>('');

	useEffect(() => {
		getAllCourses();
	}, []);

	const getAllCourses = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course`);

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
	};

	useEffect(() => {
		if (courses.length === 0) {
			setRender(
				<h1>
					No courses yet, make <Link to="/edit">one</Link>
				</h1>
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
		<div>
			<NavBar />
			{state._id ? <h1>Hello, {state.firstName}</h1> : <></>}
			<Link to="/create">Create new post</Link>
			<div>Courses</div>
			<div>
				{loading ? <LoadComponent /> : render}
				{error && error}
			</div>
		</div>
	);
};

export default HomePage;
