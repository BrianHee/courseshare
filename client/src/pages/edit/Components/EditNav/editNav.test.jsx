import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import EditNav from './index';

describe('EditNav test', () => {
	const testElement = (
		<MemoryRouter>
			<EditNav />
		</MemoryRouter>
	);

	it('should render a button to add a new lesson', () => {
		render(testElement);
		const buttonElement = screen.getByText('+ Add Lesson');
		expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
	});
});
