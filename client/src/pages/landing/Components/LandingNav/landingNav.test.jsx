import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LandingNav from './index';

describe('LandingNav test', () => {
	const testElement = (
		<MemoryRouter>
			<LandingNav />
		</MemoryRouter>
	);

	it('should render the courseshare logo', () => {
		render(testElement);
		const logoElement = screen.getByAltText('logo');
		expect(logoElement).toBeInTheDocument();
	});

	it('should render a signin button', () => {
		render(testElement);
		const logoElement = screen.getByText(/sign in/i);
		expect(logoElement).toBeInstanceOf(HTMLButtonElement);
	});
});
