import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import config from '../../../../config/config';
import logging from '../../../../config/logging';
// import ILesson from '../../../interfaces/lesson';

import ICourse from '../../../../interfaces/course';

import dragIcon from '../../../../assets/drag-icon.png';
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

	const [course, setCourse] = useState<ICourse>();
	const [lessonsArray, setLessonsArray] = useState<ILessons[]>(lessons);

	const { courseID, lessonID } = useParams();
	const navigate = useNavigate();

	const getCourse = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setCourse(response.data.course);
			} else {
				logging.error('Unable to get course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return;
		const draggableItems = Array.from(lessonsArray);
		const [reordedItem] = draggableItems.splice(result.source.index, 1);
		draggableItems.splice(result.destination.index, 0, reordedItem);

		setLessonsArray(draggableItems);
	};

	// const updateLessonOrder = async () => {
	// 	try {
	// 		const response = await axios.
	// 	}
	// }

	// useEffect(() => {

	// })

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<nav className={styles['navbar']}>
			<div className={styles['course-header']}>
				<Link to={`/edit/${courseID}`}>
					<p className={lessonID ? styles['title'] : `${styles.title} ${styles.selected}`}>
						{course && course.title}
					</p>
				</Link>
			</div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="lessons">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{lessonsArray &&
								lessonsArray.map((ele, idx) => {
									return (
										<Draggable key={ele.lessonId} draggableId={ele.lessonId} index={idx}>
											{(provided) => (
												<li {...provided.draggableProps} ref={provided.innerRef}>
													<Link
														className={
															ele.lessonId === lessonID
																? `${styles.link} ${styles.selected}`
																: styles['link']
														}
														to={`/edit/${courseID}/${ele.lessonId}`}
													>
														{ele.lessonTitle}
														<div {...provided.dragHandleProps}>
															<img src={dragIcon} />
														</div>
													</Link>
												</li>
											)}
										</Draggable>
									);
								})}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</nav>
	);
};

export default EditNav;
