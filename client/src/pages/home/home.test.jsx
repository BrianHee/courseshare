import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './index';

describe('Home Page test', () => {
	const testElement = (
		<MemoryRouter>
			<HomePage />
		</MemoryRouter>
	);

	it('should render a greeting', () => {
		render(testElement);
		const greetingElement = screen.getByText(/hello/i);
		expect(greetingElement).toBeInTheDocument();
	});

	it('should render a button to create a new course', () => {
		render(testElement);
		const createElement = screen.getByText('New Course', { exact: false });
		expect(createElement).toBeInstanceOf(HTMLButtonElement);
	});
});
