import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../../../../config/config';
import logging from '../../../../config/logging';

import styles from './styles.module.scss';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

export interface IProps {
	lessons: ILessons[];
}

const CourseNav: React.FunctionComponent<IProps> = (props) => {
	const { lessons } = props;
	const { courseID } = useParams();

	useEffect(() => {
		console.log('CourseNav loaded');
	}, []);

	return (
		<nav>
			<h1>Nav for Course</h1>
			<ul>
				{lessons &&
					lessons.map((ele, idx) => {
						return (
							<li key={idx}>
								<Link to={`/course/${courseID}/${ele.lessonId}`}>{ele.lessonTitle}</Link>
							</li>
						);
					})}
			</ul>
		</nav>
	);
};

export default CourseNav;
