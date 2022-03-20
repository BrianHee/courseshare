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
import EditNav from '../components/CourseCreation/EditNav';
import ILesson from '../interfaces/lesson';
import EditViewPort from '../components/CourseCreation/EditViewPort';

const EditPage: React.FunctionComponent<any> = (props) => {
	const [_id, setId] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
	const [lessons, setLessons] = useState<ILesson[]>([]);

	const [saving, setSaving] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<string>('');
	const [error, setError] = useState<string>('');

	const [state, setState] = useContext(UserContext);
	const { courseID, lessonID } = useParams();

	useEffect(() => {
		if (courseID) {
			setId(courseID);
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<div>
			{error && error}
			<EditNav />
			{lessonID ? <EditViewPort /> : <h1>No available lessons</h1>}
		</div>
	);
};

export default EditPage;
