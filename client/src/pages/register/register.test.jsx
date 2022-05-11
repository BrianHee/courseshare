import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RegisterPage from './index';

describe('Register Page test', () => {
	const testElement = (
		<MemoryRouter>
			<RegisterPage />
		</MemoryRouter>
	);

	it('should render an input for first name', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('First name');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render an input for last name', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('Last name');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render an input for email', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('Email');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render an input for password', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('Password');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render an input for confirming password', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('Confirm password');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render a button for registration', () => {
		render(testElement);
		const emailElement = screen.getByText('Register');
		expect(emailElement).toBeInstanceOf(HTMLButtonElement);
	});

	it('should render a link for login page', () => {
		render(testElement);
		const emailElement = screen.getByRole('link');
		expect(emailElement).toHaveAttribute('href', '/login');
	});
});
