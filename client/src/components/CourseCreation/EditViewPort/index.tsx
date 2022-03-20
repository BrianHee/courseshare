import axios from 'axios';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useParams, Link } from 'react-router-dom';
import config from '../../../config/config';
import logging from '../../../config/logging';

export interface ILessons {}

const EditViewPort: React.FunctionComponent = () => {
	const [error, setError] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [success, setSuccess] = useState<string>('');
	const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
	const { courseID, lessonID } = useParams();

	const getLesson = async () => {
		try {
			console.log('getting', lessonID);
			const response = await axios.get(`${config.server.url}/lesson/${lessonID}`);
			console.log('response', response);

			if (response.status === 200) {
				setTitle(response.data.lesson.title);
				setContent(response.data.lesson.content);
			} else {
				console.log('Unable to find lesson');
				setError('Unable to find lesson');
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
				setSuccess('Successfully saved');
			} else {
				setError('Unable to save lesson');
			}
		} catch (error) {
			logging.error(error);
		}
	};

	const deleteLesson = async () => {};

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
		updateEditor();
	}, [content]);

	return (
		<div>
			<h1>Editor view port</h1>
			<h1>{error}</h1>
			<h1>{success}</h1>
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
						console.log('Editor change', newState);
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
				<button type="button" onClick={saveLesson}>
					Save lesson
				</button>
			</form>
		</div>
	);
};

export default EditViewPort;
