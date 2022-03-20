import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../config/config';
import logging from '../../../config/logging';
import ILesson from '../../../interfaces/lesson';

export interface IEditNavProps {
	courseId: string | null;
	lessons: ILesson[];
}

const EditNav: React.FunctionComponent = () => {
	const [error, setError] = useState('');
	const [lessons, setLessons] = useState([]);
	const [lessonsLen, setLessonsLen] = useState(0);
	const { courseID } = useParams();

	const getLessons = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}/lessons`);

			if (response.status === 200) {
				setLessons(response.data.course.lessons);
			} else {
				console.log('Unable to find');
				setError('Unable to find course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	useEffect(() => {
		getLessons();
	}, [lessons]);

	const addLesson = async () => {
		const [course, title, content] = [courseID, `Lesson ${lessonsLen + 1}`, ''];
		console.log('attempting to add lesson');

		try {
			const response = await axios.post(`${config.server.url}/lesson/create`, {
				course,
				title,
				content
			});
			console.log(response);

			if (response.status === 201) {
				try {
					const update = await axios.patch(`${config.server.url}/course/${courseID}/add`, {
						lessonId: response.data.lesson._id,
						lessonTitle: response.data.lesson.title
					});
					console.log(update, 'lesson added');
					setLessonsLen(update.data.lessons.length);
				} catch (error) {
					logging.error(error);
				}
			} else {
				logging.error('Unable to add course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	return (
		<nav>
			<h1>Nav for editor</h1>
			<h1>{error}</h1>
			<ul>
				{lessons &&
					lessons.map((ele, idx) => {
						return (
							<li key={idx}>
								<h1>{ele}</h1>
							</li>
						);
					})}
			</ul>
			<button type="button" onClick={addLesson}>
				Add Lesson
			</button>
		</nav>
	);
};

export default EditNav;

// Course -> Map the pages -> Add Page button
