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
		const firstNameElement = screen.getByPlaceholderText('First name');
		expect(firstNameElement).toBeInTheDocument();
	});

	it('should render an input for last name', () => {
		render(testElement);
		const lastNameElement = screen.getByPlaceholderText('Last name');
		expect(lastNameElement).toBeInTheDocument();
	});

	it('should render an input for email', () => {
		render(testElement);
		const emailElement = screen.getByPlaceholderText('Email');
		expect(emailElement).toBeInTheDocument();
	});

	it('should render an input for password', () => {
		render(testElement);
		const passElement = screen.getByPlaceholderText('Password');
		expect(passElement).toBeInTheDocument();
	});

	it('should render an input for confirming password', () => {
		render(testElement);
		const confirmPassElement = screen.getByPlaceholderText('Confirm password');
		expect(confirmPassElement).toBeInTheDocument();
	});

	it('should render a button for registration', () => {
		render(testElement);
		const registerElement = screen.getByText('Register');
		expect(registerElement).toBeInstanceOf(HTMLButtonElement);
	});

	it('should render a link for login page', () => {
		render(testElement);
		const loginElement = screen.getByRole('link');
		expect(loginElement).toHaveAttribute('href', '/login');
	});
});
