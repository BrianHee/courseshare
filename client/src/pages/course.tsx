import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import config from '../config/config';
import logging from '../config/logging';
import { UserContext } from '../context';
import ICourse from '../interfaces/course';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CoursePage: React.FunctionComponent<any> = (props) => {
	const [_id, setId] = useState<string>('');
	const [course, setCourse] = useState<ICourse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	const [modal, setModal] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<boolean>(false);

	const [state, setState] = useContext(UserContext);
	const { courseID } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (courseID) {
			setId(courseID);
		} else {
			navigate('/');
		}
	}, []);

	return <p>CoursePage</p>;
};

export default CoursePage;
