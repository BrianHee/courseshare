import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NavBar from './index';

describe('NavBar test', () => {
	const testElement = (
		<MemoryRouter>
			<NavBar />
		</MemoryRouter>
	);

	it('should render the coureshare logo', () => {
		render(testElement);
		const logoElement = screen.getByAltText('courseshare');
		expect(logoElement).toBeInTheDocument();
	});
});
