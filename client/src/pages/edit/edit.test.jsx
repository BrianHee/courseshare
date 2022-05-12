import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import EditPage from './index';

describe('EditPage test', () => {
	const testElement = (
		<MemoryRouter>
			<EditPage />
		</MemoryRouter>
	);

	it('should render a loading component', () => {
		render(testElement);
		const saveElement = screen.getByText(/loading/i);
		expect(saveElement).toBeInTheDocument();
	});
});
