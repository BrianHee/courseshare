import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Copyright from './index';

describe('Copyright test', () => {
	const testElement = (
		<MemoryRouter>
			<Copyright />
		</MemoryRouter>
	);

	it('should render a link for privacy page', () => {
		render(testElement);
		const linkElement = screen.getByText(/privacy/i);
		expect(linkElement).toHaveAttribute('href', '/');
	});
	it('should render a link for terms page', () => {
		render(testElement);
		const linkElement = screen.getByText(/terms/i);
		expect(linkElement).toHaveAttribute('href', '/');
	});
	it('should render a link for contact page', () => {
		render(testElement);
		const linkElement = screen.getByText(/contact/i);
		expect(linkElement).toHaveAttribute('href', '/');
	});
});
