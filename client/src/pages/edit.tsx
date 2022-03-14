import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import config from '../config/config';
import logging from '../config/logging';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import Navigation from '../components/Navigation';
import { Container, Form, FormGroup } from 'react-bootstrap';
import Header from '../components/Header';
import { Input, Label } from 'reactstrap';

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

	useEffect(() => {
		let courseID = props.match.params.courseID;

		if (courseID) {
			setId(courseID);
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
				if (state.id !== response.data.course.author.id) {
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
					author: state.id
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
					author: state.id
				}
			);

			if (response.status === 201) {
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
				</Form>
			</Container>
		</Container>
	);
};

export default EditPage;
