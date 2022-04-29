import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import dragIcon from '../../../../assets/drag-icon.png';
import tabIn from '../../../../assets/tab-in.svg';
import tabOut from '../../../../assets/tab-out.svg';
import styles from './styles.module.scss';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

export interface IProps {
	lessons: ILessons[];
	courseTitle: string;
	addFunction: () => void;
}

const EditNav: React.FunctionComponent<IProps> = (props) => {
	const { lessons, courseTitle, addFunction } = props;
	const [toggled, setToggled] = useState<boolean>(false);
	const navigationRef = useRef<HTMLElement>(null);
	const tabRef = useRef<HTMLDivElement>(null);
	const addContainerRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

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
			const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/course/${courseID}`, {
				lessons: lessonsArray
			});

			if (response.status === 201) {
				return;
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		}
	};

	const handleToggle = () => {
		const navigationElement = navigationRef.current;
		const tabElement = tabRef.current;
		const addContainer = addContainerRef.current;

		navigationElement?.classList.toggle(styles.toggle);
		tabElement?.classList.toggle(styles.toggle);
		addContainer?.classList.toggle(styles.toggle);
		if (tabElement!.classList.contains(styles.toggle)) {
			setToggled(true);
		} else {
			setToggled(false);
		}
	};

	useEffect(() => {
		setLessonsArray(lessons);
	}, [lessons]);

	useEffect(() => {
		updateLessonOrder();
	}, [lessonsArray]);

	return (
		<>
			<nav className={styles['navbar']} ref={navigationRef}>
				<div className={styles['course-header']}>
					<Link to={`/edit/${courseID}`} onClick={handleToggle}>
						<p className={lessonID ? styles['title'] : `${styles.title} ${styles.selected}`}>
							{courseTitle}
						</p>
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
														onClick={handleToggle}
														ref={provided.innerRef}
													>
														<div className={styles['lesson-title']}>{ele.lessonTitle}</div>
														<div {...provided.dragHandleProps}>
															<img src={dragIcon} alt="drag" />
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
			<div className={styles['add-lesson-container']} ref={addContainerRef}>
				<button className={`${styles.button} ${styles.add}`} type="button" onClick={addFunction}>
					+ Add Lesson
				</button>
			</div>
			<div className={styles.tab} ref={tabRef}>
				<button onClick={handleToggle}>
					{toggled ? <img src={tabIn} alt="tab" /> : <img src={tabOut} alt="tab" />}
				</button>
			</div>
		</>
	);
};

export default EditNav;
