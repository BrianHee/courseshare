import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Footer from './index';

describe('Footer test', () => {
	const testElement = (
		<MemoryRouter>
			<Footer />
		</MemoryRouter>
	);

	it('should render a link to sign in', () => {
		render(testElement);
		const signinElement = screen.getByText(/sign in/i);
		expect(signinElement).toBeInstanceOf(HTMLButtonElement);
	});

	it('should render a link for guest login', () => {
		render(testElement);
		const guestElement = screen.getByText(/guest login/i);
		expect(guestElement).toHaveAttribute('href', '/guest');
	});
});
