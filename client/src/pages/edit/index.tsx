import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import config from '../../config/config';
import logging from '../../config/logging';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditNav from './Components/EditNav';

import ILesson from '../../interfaces/lesson';

import styles from './styles.module.scss';
import NavBar from '../../components/NavBar';
import saveIcon from '../../assets/save.png';
import trashIcon from '../../assets/trash.png';
import trashOpen from '../../assets/trash-open.png';
import ICourse from '../../interfaces/course';
import { UserContext } from '../../context';
import LoadingComponent from '../../components/LoadingComponent';
import ToastPortal from '../../components/Toast/ToastPortal';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

const EditPage: React.FunctionComponent<any> = (props) => {
	const [navLessons, setNavLessons] = useState<ILessons[]>([]);
	const [lessonsLen, setLessonsLen] = useState<number>(0);

	const [course, setCourse] = useState<ICourse>();
	const [courseTitle, setCourseTitle] = useState<string>('');
	const [courseDesc, setCourseDesc] = useState<string>('');
	const [courseImage, setCourseImage] = useState<string>('');
	const [lesson, setLesson] = useState<ILesson>();
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
	const [update, setUpdate] = useState<boolean>(false);

	const [success, setSuccess] = useState<string>('');
	const [error, setError] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(true);

	const { courseID, lessonID } = useParams();

	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	const navigate = useNavigate();

	const getCourse = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				if (state._id === response.data.course.author._id) {
					setCourse(response.data.course);
					setCourseTitle(response.data.course.title);
					setCourseDesc(response.data.course.description);
					setCourseImage(response.data.course.image);
					setNavLessons(response.data.course.lessons);
					setLessonsLen(response.data.course.lessons.length);
				} else {
					console.log(state._id, response.data.course.author._id);
					return navigate('/error');
				}
			} else {
				logging.error('Unable to find course');
			}
		} catch (error) {
			logging.error(error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	useEffect(() => {
		getCourse();
	}, [lessonsLen]);

	const addLesson = async () => {
		const [course, title, content] = [courseID, `Lesson ${lessonsLen + 1}`, ''];

		try {
			const response = await axios.post(`${config.server.url}/lesson/create`, {
				course,
				title,
				content
			});

			if (response.status === 201) {
				try {
					const update = await axios.patch(`${config.server.url}/course/${courseID}/add`, {
						lessonId: response.data.lesson._id,
						lessonTitle: response.data.lesson.title
					});
					setLessonsLen(update.data.lessons.length);
					navigate(`/edit/${courseID}/${response.data.lesson._id}`);
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

	const saveLesson = async () => {
		try {
			const response = await axios.patch(`${config.server.url}/lesson/${lessonID}`, {
				title,
				content
			});

			if (response.status === 201) {
				try {
					const response = await axios.patch(`${config.server.url}/course/${courseID}/${lessonID}`, {
						lessonTitle: title
					});
					setSuccess('Successfully saved');
					getCourse();
				} catch (error) {
					logging.error(error);
				}
			} else {
				setError('Unable to save lesson');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	const deleteLesson = async () => {
		try {
			const response = await axios.delete(`${config.server.url}/lesson/${lessonID}`);

			if (response.status === 201) {
				try {
					const reply = await axios.delete(`${config.server.url}/course/${courseID}/${lessonID}`);

					if (response.status === 201) {
						setNavLessons(response.data.lessons);
						setLessonsLen(lessonsLen - 1);
					}
				} catch (error) {
					logging.error('Unable to delete lesson from course');
				}
			} else {
				logging.error('Unable to delete lesson');
			}
		} catch (error) {
			logging.error(error);
		} finally {
			navigate(`/edit/${courseID}`);
		}
	};

	const saveCourse = async () => {
		try {
			const response = await axios.patch(`${config.server.url}/course/${courseID}`, {
				title: courseTitle,
				description: courseDesc,
				image: courseImage
			});

			if (response.status === 201) {
			} else {
				logging.error('unable to save course title and desc');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	const deleteCourse = async () => {
		try {
			const response = await axios.delete(`${config.server.url}/course/${courseID}`);

			if (response.status === 201) {
				const reply = await axios.delete(`${config.server.url}/lesson/course/${courseID}`);

				if (reply.status === 201) {
				} else {
					logging.error('Unable to delete lessons');
				}
			} else {
				logging.error('Unable to delete course');
			}
		} catch (error) {
			logging.error(error);
		} finally {
			navigate('/home');
		}
	};

	const seePreview = () => {
		navigate(`/course/${courseID}`);
	};

	const getLesson = async () => {
		if (lessonsLen === 0) {
			return;
		}

		if (lessonID) {
			try {
				const response = await axios.get(`${config.server.url}/lesson/${lessonID}`);

				if (response.status === 200) {
					setLesson(response.data.lesson);
					setTitle(response.data.lesson.title);
					setContent(response.data.lesson.content);
					setUpdate(true);
				} else {
					logging.error('Unable to find lesson');
				}
			} catch (error) {
				logging.error(error);
			} finally {
				setUpdate(false);
			}
		}
	};

	const updateEditor = () => {
		const contentBlock = htmlToDraft(content);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		const editorState = EditorState.createWithContent(contentState);

		setEditorState(editorState);
	};

	useEffect(() => {
		if (lessonID) {
			getLesson();
		}
	}, [lessonID]);

	useEffect(() => {
		if (!lesson) {
			getLesson();
		}
	});

	useEffect(() => {
		if (update) {
			updateEditor();
		}
	}, [update]);

	if (!courseID) {
		navigate('/error');
	}

	return (
		<div className={styles['wrapper']}>
			<NavBar />
			{loading ? (
				<LoadingComponent />
			) : (
				<div className={styles['workspace-container']}>
					<div className={styles['edit-nav']}>
						<EditNav lessons={navLessons} />
						<div className={styles['add-lesson-container']}>
							<button className={`${styles.button} ${styles.add}`} type="button" onClick={addLesson}>
								+ Add Lesson
							</button>
						</div>
					</div>
					<div className={styles['right-component']}>
						{lessonID ? (
							<div className={styles['editor-viewport']}>
								<div className={styles['viewport-header']}>
									<h1 className={styles['lesson-title']}>{title}</h1>
									<div className={styles['header-buttons']}>
										<button
											className={`${styles.button} ${styles['save-lesson']}`}
											type="button"
											onClick={saveLesson}
										>
											<img src={saveIcon} alt="save" height="15" /> Save Lesson
										</button>
										<button
											className={`${styles.button} ${styles.delete}`}
											type="button"
											onClick={deleteLesson}
										>
											<img src={trashIcon} alt="trash" height="15" /> Delete Lesson
										</button>
									</div>
								</div>
								<form className={styles['lesson-form']}>
									<label>Title</label>
									<br />
									<input
										className={styles.input}
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									></input>
									<br />
									<label>Content</label>
									<Editor
										editorState={editorState}
										wrapperClassName={styles['wysiwyg-wrapper']}
										editorClassName={styles['wysiwyg-editor']}
										onEditorStateChange={(newState) => {
											setEditorState(newState);
											setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
										}}
										toolbar={{
											options: [
												'inline',
												'blockType',
												'fontSize',
												'list',
												'textAlign',
												'history',
												'emoji',
												'image'
											],
											inline: { inDropdown: false },
											list: { inDropdown: false },
											textAlign: { inDropdown: false },
											link: { inDropdown: false },
											history: { inDropdown: false }
										}}
										toolbarStyle={{
											position: 'sticky',
											top: 0,
											zIndex: 1000
										}}
									/>
								</form>
							</div>
						) : (
							<div className={styles['course-editor']}>
								<div className={styles['viewport-header']}>
									<h1>Course Information</h1>
									<div className={styles['header-buttons']}>
										<button
											className={`${styles.button} ${styles['save-lesson']}`}
											type="button"
											onClick={saveCourse}
										>
											<img src={saveIcon} alt="save" height="15" /> Save
										</button>
										<button
											className={`${styles.button} ${styles.delete}`}
											type="button"
											onClick={deleteCourse}
										>
											<img src={trashIcon} alt="trash" height="15" /> Delete Course
										</button>
									</div>
								</div>
								<div>
									<label>Title</label>
									<input
										className={styles.input}
										type="text"
										value={courseTitle}
										onChange={(e) => setCourseTitle(e.target.value)}
									/>
									<label>Description</label>
									<textarea
										className={`${styles.input} ${styles['desc-input']}`}
										value={courseDesc}
										onChange={(e) => setCourseDesc(e.target.value)}
									/>
									<label>Image</label>
									<input
										className={styles.input}
										placeholder="URL"
										type="text"
										value={courseImage}
										onChange={(e) => setCourseImage(e.target.value)}
									/>
									{courseImage ? (
										<div className={styles['image-wrapper']}>
											<img src={courseImage} alt="image" />
										</div>
									) : null}
								</div>
							</div>
						)}
						<div className={styles['button-container']}>
							<button
								className={`${styles.button} ${styles['preview-course']}`}
								type="button"
								onClick={seePreview}
							>
								Preview
							</button>
						</div>
					</div>
				</div>
			)}
			<ToastPortal />
		</div>
	);
};

export default EditPage;
