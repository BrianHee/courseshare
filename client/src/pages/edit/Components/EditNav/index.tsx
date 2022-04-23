import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
	courseTitle: string;
}

const EditNav: React.FunctionComponent<IProps> = (props) => {
	const { lessons, courseTitle } = props;

	const [lessonsArray, setLessonsArray] = useState<ILessons[]>(lessons);

	const { courseID, lessonID } = useParams();

	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return;
		const draggableItems = Array.from(lessonsArray);
		const [reordedItem] = draggableItems.splice(result.source.index, 1);
		draggableItems.splice(result.destination.index, 0, reordedItem);

		setLessonsArray(draggableItems);
	};

	const updateLessonOrder = async () => {
		try {
			const response = await axios.patch(`${config.server.url}/course/${courseID}`, {
				lessons: lessonsArray
			});

			if (response.status === 201) {
				console.log('successfully reordered lessons');
			} else {
				logging.error('Unable to save course title and desc');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	useEffect(() => {
		setLessonsArray(lessons);
	}, [lessons]);

	useEffect(() => {
		updateLessonOrder();
	}, [lessonsArray]);

	return (
		<nav className={styles['navbar']}>
			<div className={styles['course-header']}>
				<Link to={`/edit/${courseID}`}>
					<p className={lessonID ? styles['title'] : `${styles.title} ${styles.selected}`}>{courseTitle}</p>
				</Link>
			</div>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="lessons">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{lessonsArray &&
								lessonsArray.map((ele, idx) => {
									return (
										<Draggable key={ele.lessonId} draggableId={ele.lessonId} index={idx}>
											{(provided) => (
												<Link
													className={
														ele.lessonId === lessonID
															? `${styles.link} ${styles.selected}`
															: styles['link']
													}
													to={`/edit/${courseID}/${ele.lessonId}`}
													{...provided.draggableProps}
													ref={provided.innerRef}
												>
													{ele.lessonTitle}
													<div {...provided.dragHandleProps}>
														<img src={dragIcon} />
													</div>
												</Link>
											)}
										</Draggable>
									);
								})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</nav>
	);
};

export default EditNav;
