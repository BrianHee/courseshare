import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import GuestPage from './index';

describe('Register Page test', () => {
	const testElement = (
		<MemoryRouter>
			<GuestPage />
		</MemoryRouter>
	);

	it('should render a loading message', () => {
		render(testElement);
		const emailElement = screen.getByText('Authenticating Guest Login');
		expect(emailElement).toBeInTheDocument();
	});
});
