import React from 'react';
import { Link } from 'react-router-dom';

import shareIcon from '../../assets/share.png';
import defaultImage from '../../assets/default-image.png';
import styles from './styles.module.scss';

export interface ICoursePreviewProps {
	_id: string;
	title: string;
	image?: string;
}

const CoursePreview: React.FunctionComponent<ICoursePreviewProps> = (props) => {
	const { _id, title, image } = props;

	return (
		<div className={styles['container']}>
			<div className={styles.wrapper}>
				<Link to={`/edit/${_id}`}>
					<div className={styles['image-wrapper']}>
						{image ? (
							<img className={styles['image']} src={image} alt="course" />
						) : (
							<img className={styles['default-image']} src={defaultImage} alt="course" />
						)}
					</div>
					<div className={styles['title-wrapper']}>{title}</div>
				</Link>
				<Link to={`/course/${_id}`}>
					<div className={styles['share-wrapper']}>
						<div>Share</div>
						<img src={shareIcon} alt="share" height="20" />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default CoursePreview;
