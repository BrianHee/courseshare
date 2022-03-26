import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export interface ICoursePreviewProps {
	_id: string;
	title: string;
	author: string;
	createdAt: string;
	updatedAt: string;
}

const CoursePreview: React.FunctionComponent<ICoursePreviewProps> = (props) => {
	const { _id, author, children, createdAt, updatedAt, title } = props;

	return (
		<div className={styles['container']}>
			<div>
				<Link to={`/edit/${_id}`} style={{ textDecoration: 'none' }} className="text-primary">
					<h1>
						<strong>{title}</strong>
					</h1>
					<br />
				</Link>
				{createdAt !== updatedAt ? (
					<p>
						Updated by {author} at {new Date(updatedAt).toLocaleString()}
					</p>
				) : (
					<p>
						Posted by {author} at {new Date(createdAt).toLocaleString()}
					</p>
				)}
				{children}
			</div>
		</div>
	);
};

export default CoursePreview;
