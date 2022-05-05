import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CoursePreview from './index';

describe('CoursePreview Test', () => {
	const testProps = {
		_id: '1',
		title: 'How to Prepare a New York Strip',
		image: 'https://theviewfromgreatisland.com/wp-content/uploads/2020/01/new-york-strip-steak-sliced-scaled.jpg'
	};

	const testElement = (
		<MemoryRouter>
			<CoursePreview {...testProps} />
		</MemoryRouter>
	);

	it('should render the course title', () => {
		render(testElement);
		const previewElement = screen.getByText(`${testProps.title}`);
		expect(previewElement).toBeInTheDocument();
	});

	it('should link to the course edit page', () => {
		render(testElement);
		const previewElement = screen.getByText(`${testProps.title}`);
		expect(previewElement.closest('a')).toHaveAttribute('href', `/edit/${testProps._id}`);
	});

	it('should render the course image', () => {
		render(testElement);
		const imageElement = screen.getByAltText('course');
		expect(imageElement).toHaveAttribute('src', testProps.image);
	});
});
