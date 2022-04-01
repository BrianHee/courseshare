import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import config from '../../config/config';
import logging from '../../config/logging';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditNav from './Components/EditNav';

import styles from './styles.module.scss';

export interface ILessons {
	lessonId: string;
	lessonTitle: string;
}

const EditPage: React.FunctionComponent<any> = (props) => {
	const [navLessons, setNavLessons] = useState<ILessons[]>([]);
	const [lessonsLen, setLessonsLen] = useState<number>(0);

	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
	const [update, setUpdate] = useState<boolean>(false);

	const [success, setSuccess] = useState<string>('');
	const [error, setError] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(false);

	const { courseID, lessonID } = useParams();

	const navigate = useNavigate();

	const getNavLessons = async () => {
		try {
			const response = await axios.get(`${config.server.url}/course/${courseID}`);

			if (response.status === 200) {
				setNavLessons(response.data.course.lessons);
				setLessonsLen(response.data.course.lessons.length);
				console.log('length:', lessonsLen);
				console.log('lessons set:', navLessons);
			} else {
				console.log('Unable to find');
				setError('Unable to find course');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	useEffect(() => {
		getNavLessons();
	}, [lessonsLen]);

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
		//fix this function
		try {
			const response = await axios.patch(`${config.server.url}/lesson/${lessonID}`, {
				title,
				content
			});
			console.log('Lesson saved');

			if (response.status === 201) {
				try {
					const response = await axios.patch(`${config.server.url}/course/${courseID}/${lessonID}`, {
						lessonTitle: title
					});
					console.log('Lesson title saved');
					setSuccess('Successfully saved');
					getNavLessons();
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
				console.log('Lesson deleted from Lessons');

				try {
					const reply = await axios.delete(`${config.server.url}/course/${courseID}/${lessonID}`);

					if (response.status === 201) {
						console.log('Lesson deleted from Course');
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

	const deleteCourse = async () => {
		console.log('Delete course called');
		try {
			const response = await axios.delete(`${config.server.url}/course/${courseID}`);

			if (response.status === 201) {
				console.log('Course delete, now deleting lessons');

				const reply = await axios.delete(`${config.server.url}/lesson/course/${courseID}`);

				if (reply.status === 201) {
					console.log('All lessons deleted');
					console.log(reply.data.message);
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

		try {
			console.log('getting', lessonID);
			const response = await axios.get(`${config.server.url}/lesson/${lessonID}`);
			console.log('response', response);

			if (response.status === 200) {
				setTitle(response.data.lesson.title);
				setContent(response.data.lesson.content);
				setUpdate(true);
			} else {
				console.log('Unable to find lesson');
				setError('Unable to find lesson');
			}
		} catch (error) {
			logging.error(error);
		} finally {
			setUpdate(false);
		}
	};

	const updateEditor = () => {
		const contentBlock = htmlToDraft(content);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		const editorState = EditorState.createWithContent(contentState);

		setEditorState(editorState);
	};

	useEffect(() => {
		getLesson();
	}, [lessonID]);

	useEffect(() => {
		if (update) {
			updateEditor();
		}
	}, [update]);

	if (!courseID) {
		navigate('/error');
	}

	return (
		<div className={styles['container']}>
			<div className={styles['edit-nav']}>
				<h1>{title}</h1>
				<EditNav lessons={navLessons} />
				<div className={styles['add-lesson-container']}>
					<button className={styles['add-lesson-button']} type="button" onClick={addLesson}>
						+ Add Lesson
					</button>
				</div>
			</div>
			{lessonID ? (
				<div className={styles['viewport']}>
					<h1>Editor view port</h1>
					<form>
						<label>Title</label>
						<br />
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
						<br />
						<label>Content</label>
						<Editor
							editorState={editorState}
							wrapperClassName="card"
							editorClassName="card-body"
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
									'embedded',
									'emoji',
									'image'
								],
								inline: { inDropdown: false },
								list: { inDropdown: false },
								textAlign: { inDropdown: false },
								link: { inDropdown: false },
								history: { inDropdown: false }
							}}
						/>
					</form>
				</div>
			) : (
				<h1>No available lessons</h1>
			)}
			<button type="button" onClick={saveLesson}>
				Save lesson
			</button>
			<button type="button" onClick={deleteLesson}>
				Delete lesson
			</button>
			<br />
			<button type="button" onClick={seePreview}>
				Preview
			</button>
			<button type="button" onClick={deleteCourse}>
				Delete course
			</button>
			{error && error}
			{success && success}
		</div>
	);
};

export default EditPage;
