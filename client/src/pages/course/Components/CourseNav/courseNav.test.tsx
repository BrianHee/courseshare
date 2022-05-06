import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CourseNav from './index';

describe('CourseNav test', () => {
	const testLessons = [
		{
			lessonId: '1',
			lessonTitle: 'Ingredients'
		},
		{
			lessonId: '2',
			lessonTitle: 'Preparation'
		},
		{
			lessonId: '3',
			lessonTitle: 'Searing the Strip'
		},
		{
			lessonId: '4',
			lessonTitle: 'Sautéing the Mushrooms'
		}
	];

	const testElement = (
		<MemoryRouter>
			<CourseNav lessons={testLessons} />
		</MemoryRouter>
	);

	it('should render a list of links for the lessons and course', () => {
		render(testElement);
		const lessonElements = screen.getAllByRole('link');
		expect(lessonElements.length).toEqual(testLessons.length + 1);
	});

	it('should link to each lesson properly', () => {
		render(testElement);
		const linkElements = screen.getAllByRole('link');

		linkElements.map((linkElement, idx) => {
			if (idx === 0) {
				expect(linkElement).toHaveAttribute('href', `/course/undefined`);
			} else {
				expect(linkElement).toHaveAttribute('href', `/course/undefined/${testLessons[idx - 1].lessonId}`);
			}
		});
	});
});
