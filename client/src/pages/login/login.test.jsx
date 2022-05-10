import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPage from './index';

describe('Login Page test', () => {
	const testElement = (
		<MemoryRouter>
			<LoginPage />
		</MemoryRouter>
	);

	it('should render an input for email', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('Email');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render an input for password', () => {
		render(testElement);
		const passwordElement = screen.getByPlaceholderText('Password');
		expect(passwordElement).toBeInTheDocument();
	});

	it('should render a button for login', () => {
		render(testElement);
		const loginElement = screen.getByText('Sign In');
		expect(loginElement).toBeInstanceOf(HTMLButtonElement);
	});

	it('should render a link for registration', () => {
		render(testElement);
		const registerElement = screen.getByRole('link');
		expect(registerElement).toHaveAttribute('href', '/register');
	});
});
