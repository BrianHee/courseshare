import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';

import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditNav from './Components/EditNav';

import ILesson from '../../interfaces/lesson';

import styles from './styles.module.scss';
import NavBar from '../../components/NavBar';
import saveIcon from '../../assets/save.png';
import trashIcon from '../../assets/trash.png';
import { UserContext } from '../../context';
import LoadingSpinner from '../../components/LoadingSpinner';
import ToastPortal from '../../components/Toast/ToastPortal';
import ModalPortal from '../../components/Modal/ModalPortal';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

const EditPage: React.FunctionComponent<any> = (props) => {
	const [navLessons, setNavLessons] = useState<ILessons[]>([]);
	const [lessonsLen, setLessonsLen] = useState<number>(0);

	const [courseTitle, setCourseTitle] = useState<string>('');
	const [courseDesc, setCourseDesc] = useState<string>('');
	const [courseImage, setCourseImage] = useState<string>('');
	const [lesson, setLesson] = useState<ILesson>();
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
	const [update, setUpdate] = useState<boolean>(false);

	//toast notifications
	const toastRef = useRef<any>();
	//modal
	const modalRef = useRef<any>();

	const [loading, setLoading] = useState<boolean>(true);

	const { courseID, lessonID } = useParams();

	const userContext = useContext(UserContext);
	const [state, setState] = userContext;

	const navigate = useNavigate();

	const getCourse = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/course/${courseID}`);

			if (response.status === 200) {
				if (state._id === response.data.course.author._id) {
					setCourseTitle(response.data.course.title);
					setCourseDesc(response.data.course.description);
					setCourseImage(response.data.course.image);
					setNavLessons(response.data.course.lessons);
					setLessonsLen(response.data.course.lessons.length);
				} else {
					navigate('/error');
				}
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
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
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/lesson/create`, {
				course,
				title,
				content
			});
			if (response.status === 201) {
				try {
					const reply = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/course/${courseID}/add`, {
						lessonId: response.data.lesson._id,
						lessonTitle: response.data.lesson.title
					});
					setLessonsLen(reply.data.lessons.length);
					navigate(`/edit/${courseID}/${response.data.lesson._id}`);
				} catch (error) {
					navigate('/error');
				}
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		}
	};

	const saveLesson = async () => {
		try {
			const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/lesson/${lessonID}`, {
				title,
				content
			});

			if (response.status === 201) {
				addToast('success', 'Lesson successfully saved.');
				try {
					const response = await axios.patch(
						`${process.env.REACT_APP_SERVER_URL}/course/${courseID}/${lessonID}`,
						{
							lessonTitle: title
						}
					);
					if (response.status === 201) {
						getCourse();
					} else {
						navigate('/error');
					}
				} catch (error) {
					navigate('/error');
				}
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		}
	};

	const deleteLesson = async () => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/lesson/${lessonID}`);

			if (response.status === 201) {
				addToast('delete', 'Lesson successfully deleted.');
				try {
					const reply = await axios.delete(
						`${process.env.REACT_APP_SERVER_URL}/course/${courseID}/${lessonID}`
					);

					if (reply.status === 201) {
						setNavLessons(response.data.lessons);
						setLessonsLen(lessonsLen - 1);
					} else {
						navigate('/error');
					}
				} catch (error) {
					navigate('/error');
				}
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		} finally {
			navigate(`/edit/${courseID}`);
		}
	};

	const deleteLessonModal = () => {
		addModal('lesson', deleteLesson);
	};

	const saveCourse = async () => {
		try {
			const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/course/${courseID}`, {
				title: courseTitle,
				description: courseDesc,
				image: courseImage
			});

			if (response.status === 201) {
				setCourseTitle(response.data.course.title);
				setCourseDesc(response.data.course.description);
				setCourseImage(response.data.course.image);

				addToast('success', 'Course successfully saved.');
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		}
	};

	const deleteCourse = async () => {
		try {
			const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/course/${courseID}`);

			if (response.status === 201) {
				const reply = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/lesson/course/${courseID}`);

				if (reply.status === 201) {
				} else {
					navigate('/error');
				}
			} else {
				navigate('/error');
			}
		} catch (error) {
			navigate('/error');
		} finally {
			navigate('/home');
		}
	};

	const deleteCourseModal = () => {
		addModal('course', deleteCourse);
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
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/lesson/${lessonID}`);

				if (response.status === 200) {
					setLesson(response.data.lesson);
					setTitle(response.data.lesson.title);
					setContent(response.data.lesson.content);
					setUpdate(true);
				} else {
					navigate('/error');
				}
			} catch (error) {
				navigate('/error');
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

	const addToast = (type: string, message: string) => {
		toastRef.current!.addMessage({ type, message });
	};

	const addModal = (type: 'course' | 'lesson', onConfirm: () => void) => {
		modalRef.current!.addModal({ type, onConfirm });
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
				<LoadingSpinner />
			) : (
				<div className={styles['workspace-container']}>
					<div className={styles['edit-nav']}>
						<EditNav lessons={navLessons} courseTitle={courseTitle} addFunction={addLesson} />
					</div>
					<div className={styles['right-component']}>
						{lessonID ? (
							<div className={styles['editor-viewport']}>
								<div className={styles['viewport-header']}>
									<div className={styles['lesson-title']}>
										<h1>{title}</h1>
									</div>
									<div className={styles['header-buttons']}>
										<button
											className={`${styles.button} ${styles['save-lesson']}`}
											type="button"
											onClick={saveLesson}
										>
											<img src={saveIcon} alt="save" height="15" /> <span>Save Lesson</span>
										</button>
										<button
											className={`${styles.button} ${styles.delete}`}
											type="button"
											onClick={deleteLessonModal}
										>
											<img src={trashIcon} alt="trash" height="15" /> <span>Delete Lesson</span>
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
											<img src={saveIcon} alt="save" height="15" /> <span>Save Course</span>
										</button>
										<button
											className={`${styles.button} ${styles.delete}`}
											type="button"
											onClick={deleteCourseModal}
										>
											<img src={trashIcon} alt="trash" height="15" /> <span>Delete Course</span>
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
											<img src={courseImage} alt="course" />
										</div>
									) : null}
								</div>
							</div>
						)}
						<div className={styles['preview-container']}>
							<button
								className={`${styles.button} ${styles['preview']}`}
								type="button"
								onClick={seePreview}
							>
								Preview
							</button>
						</div>
					</div>
				</div>
			)}
			<ModalPortal ref={modalRef} />
			<ToastPortal ref={toastRef} />
		</div>
	);
};

export default EditPage;
