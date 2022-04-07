import React from 'react';
import { Link } from 'react-router-dom';

import shareIcon from '../../assets/share.png';
import styles from './styles.module.scss';

export interface ICoursePreviewProps {
	_id: string;
	title: string;
	image?: string;
}

const CoursePreview: React.FunctionComponent<ICoursePreviewProps> = (props) => {
	const { _id, title, image } = props;

	return (
		<Link to={`/edit/${_id}`} className={styles['container']}>
			<div className={styles['image-wrapper']}>
				<img src={image} alt="image" />
			</div>
			<div className={styles['text-wrapper']}>
				<div className={styles['title-wrapper']}>{title}</div>
				<div className={styles['share-wrapper']}>
					<Link to={`/course/${_id}`}>
						<div>Share</div>
						<img src={shareIcon} alt="share" height="20" />
					</Link>
				</div>
			</div>
		</Link>
	);
};

export default CoursePreview;
