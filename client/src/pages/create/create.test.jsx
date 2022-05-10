import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CreatePage from './index';

describe('Create Page test', () => {
	const testElement = (
		<MemoryRouter>
			<CreatePage />
		</MemoryRouter>
	);

	it('should render an input for course title', () => {
		render(testElement);
		const titleInputElement = screen.getByText('Title');
		expect(titleInputElement.nextSibling).toBeInstanceOf(HTMLInputElement);
	});

	it('should render an input for course description', () => {
		render(testElement);
		const descInputElement = screen.getByText('Description');
		expect(descInputElement.nextSibling).toBeInstanceOf(HTMLTextAreaElement);
	});

	it('should render an input for course image', () => {
		render(testElement);
		const imageInputElement = screen.getByText('Image');
		expect(imageInputElement.nextSibling).toBeInstanceOf(HTMLInputElement);
	});

	it('should render a button to submit creation', () => {
		render(testElement);
		const buttonElement = screen.getByText('Create Course');
		expect(buttonElement).toBeInTheDocument();
	});
});
