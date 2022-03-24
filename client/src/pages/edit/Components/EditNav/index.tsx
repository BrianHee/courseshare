import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../../../../config/config';
import logging from '../../../../config/logging';
// import ILesson from '../../../interfaces/lesson';

import styles from './styles.module.scss';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

export interface IProps {
	lessons: ILessons[];
}

const EditNav: React.FunctionComponent<IProps> = (props) => {
	const { lessons } = props;
	const { courseID } = useParams();
	const navigate = useNavigate();

	return (
		<nav>
			<h1>Nav for editor</h1>
			<ul>
				{lessons &&
					lessons.map((ele, idx) => {
						return (
							<li key={idx}>
								<Link to={`/edit/${courseID}/${ele.lessonId}`}>{ele.lessonTitle}</Link>
							</li>
						);
					})}
			</ul>
		</nav>
	);
};

export default EditNav;
