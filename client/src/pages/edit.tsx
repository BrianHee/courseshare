import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import config from '../config/config';
import logging from '../config/logging';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import Navigation from '../components/Misc/Navigation';
import { Container, Form, FormGroup } from 'react-bootstrap';
import Header from '../components/Misc/Header';
import { Button, Input, Label } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import SuccessText from '../components/Misc/SuccessText';
import { Link, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditPage: React.FunctionComponent<any> = (props) => {
	const [_id, setId] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [picture, setPicture] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [headline, setHeadline] = useState<string>('');
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	);

	const [saving, setSaving] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [success, setSuccess] = useState<string>('');
	const [error, setError] = useState<string>('');

	const [state, setState] = useContext(UserContext);
	const { courseID } = useParams();

	useEffect(() => {
		// let courseID = props.match.params.courseID;

		if (courseID) {
			setId(courseID);
			getCourse(courseID);
		} else {
			setLoading(false);
		}
	}, []);

	const getCourse = async (id: string) => {
		try {
			const response = await axios.get(
				`${config.server.url}/courses/${id}`
			);

			if (response.status === 200) {
				if (state._id !== response.data.course.author._id) {
					logging.warn('This course is owned by someone else');
					setId('');
				} else {
					let course = response.data.course as ICourse;

					setTitle(course.title);
					setPicture(course.picture || '');
					setContent(course.content);
					setHeadline(course.headline);

					// Convert html to draft
					const contentBlock = htmlToDraft(course.content);
					const contentState = ContentState.createFromBlockArray(
						contentBlock.contentBlocks
					);
					const _editorState =
						EditorState.createWithContent(contentState);
					setEditorState(_editorState);
				}
			} else {
				setError(`Unable to retrieve course ${_id}`);
				setId('');
			}
		} catch (error) {
			logging.error(error);
			setError(error as string); // ? as string?
		} finally {
			setLoading(false);
		}
	};

	const createCourse = async () => {
		if (title === '' || headline === '' || content === '') {
			setError('Please fill out all required forms');
			setSuccess('');
			return;
		}

		setError('');
		setSuccess('');
		setSaving(true);

		try {
			const response = await axios.post(
				`${config.server.url}/courses/create`,
				{
					title,
					picture,
					headline,
					content,
					author: state._id
				}
			);

			if (response.status === 201) {
				setId(response.data.course._id);
				setSuccess('Course posted.');
			} else {
				setError('Unable to create course');
			}
		} catch (error) {
			logging.error(error);
			setError(error as string);
		} finally {
			setSaving(false);
		}
	};

	const editCourse = async () => {
		if (title === '' || headline === '' || content === '') {
			setError('Please fill out all required forms');
			setSuccess('');
			return;
		}

		setError('');
		setSuccess('');
		setSaving(true);

		try {
			const response = await axios.patch(
				`${config.server.url}/courses/update/${_id}`,
				{
					title,
					picture,
					headline,
					content,
					author: state._id
				}
			);

			if (response.status === 201 || 200) {
				setSuccess('Course updated.');
			} else {
				setError('Unable to update course');
			}
		} catch (error) {
			logging.error(error);
			setError(error as string);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Container fluid className="p=0">
			<Navigation />
			<Header
				headline=""
				title={_id !== '' ? 'Edit course' : 'Create course'}
			/>
			<Container className="mt-5 mb-5">
				<h1>{error}</h1>
				<Form>
					<FormGroup>
						<Label for="title">Title</Label>
						<Input
							type="text"
							name="title"
							value={title}
							id="title"
							placeholder="Enter title"
							disabled={saving}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="headline">Headline</Label>
						<Input
							type="text"
							name="headline"
							value={headline}
							id="headline"
							placeholder="Enter headline"
							disabled={saving}
							onChange={(e) => setHeadline(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Content</Label>
						<Editor
							editorState={editorState}
							wrapperClassName="card"
							editorClassName="card-body"
							onEditorStateChange={(newState) => {
								setEditorState(newState);
								setContent(
									draftToHtml(
										convertToRaw(
											newState.getCurrentContent()
										)
									)
								);
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
								inline: { inDropdown: true },
								list: { inDropdown: true },
								textAlign: { inDropdown: true },
								link: { inDropdown: true },
								history: { inDropdown: true }
							}}
						/>
					</FormGroup>
					<FormGroup>
						<SuccessText success={success} />
					</FormGroup>
					<FormGroup>
						<Button
							block
							onClick={() => {
								if (_id !== '') {
									editCourse();
								} else {
									createCourse();
								}
							}}
							disabled={saving}
						>
							<i className="fas fa-save mr-1"></i>
							{_id !== '' ? 'Update' : 'Post'}
						</Button>
						{_id !== '' && (
							<Button
								block
								color="success"
								tag={Link}
								to={`/courses/${_id}`}
							>
								View your post!
							</Button>
						)}
					</FormGroup>
					<FormGroup>
						<Label>Preview</Label>
						<div className="border p-2">
							<div
								dangerouslySetInnerHTML={{
									__html: content
								}}
							></div>
						</div>
					</FormGroup>
				</Form>
			</Container>
		</Container>
	);
};

export default EditPage;
