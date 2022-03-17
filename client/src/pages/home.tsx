import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';

import PageInterface from '../interfaces/page';
import NavBar from '../components/NavBar';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import config from '../config/config';
import logging from '../config/logging';
import { Link } from 'react-router-dom';
import CoursePreview from '../components/CoursePreview';
import IUser from '../interfaces/user';

const HomePage: React.FunctionComponent<PageInterface> = (props) => {
	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	const [courses, setCourses] = useState<ICourse[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		getAllCourses();
	}, []);

	const getAllCourses = async () => {
		try {
			const response = await axios.get(`${config.server.url}/courses`);

			if (response.status === 200) {
				let courses = response.data.courses;
				courses.sort((x: ICourse, y: ICourse) =>
					y.updatedAt.localeCompare(x.updatedAt)
				);
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

	if (loading) {
		return <h1>Loading courses...</h1>;
	}

	return (
		<Container fluid className="p-0">
			<NavBar />
			{state._id ? <h1>Hello, {state.firstName}</h1> : <></>}
			<Link to="/edit">Create new post</Link>
			<Container className="mt-5">Courses</Container>
			<Container className="mt-5">
				{courses.length === 0 && (
					<h1>
						No courses yet, make <Link to="/edit">one</Link>
					</h1>
				)}
				{courses.map((course, index) => {
					return (
						<div key={index}>
							<CoursePreview
								_id={course._id}
								author={(course.author as IUser).firstName}
								headline={course.headline}
								title={course.title}
								createdAt={course.createdAt}
								updatedAt={course.updatedAt}
							/>
						</div>
					);
				})}
				{error && error}
			</Container>
		</Container>
	);
};

export default HomePage;
