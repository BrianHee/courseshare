import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ErrorPage from './index';

describe('Register Page test', () => {
	const testElement = (
		<MemoryRouter>
			<ErrorPage />
		</MemoryRouter>
	);

	it('should render an error message', () => {
		render(testElement);
		const emailElement = screen.getByText('Whoops!');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render a return link for home page', () => {
		render(testElement);
		const emailElement = screen.getByRole('link');
		expect(emailElement).toHaveAttribute('href', '/home');
	});
});
