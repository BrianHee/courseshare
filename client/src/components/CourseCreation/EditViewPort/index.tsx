import axios from 'axios';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useParams, Link, useNavigate } from 'react-router-dom';
import config from '../../../config/config';
import logging from '../../../config/logging';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export interface ILessons {}

const EditViewPort: any = () => {
	const [error, setError] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [success, setSuccess] = useState<string>('');
	const [update, setUpdate] = useState<boolean>(false);
	const { courseID, lessonID } = useParams();

	const navigate = useNavigate();
};

export default EditViewPort;
