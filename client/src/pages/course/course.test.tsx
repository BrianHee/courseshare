import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import axiosMock from 'axios';

import CoursePage from './index';

jest.mock('axios');

describe('CoursePage test', () => {
	const testElement = (
		<MemoryRouter>
			<CoursePage />
		</MemoryRouter>
	);

	it('should render course author', async () => {
		await act(async () => {
			render(testElement);
		});
		const authorElement = screen;
		// expect(authorElement).toBeInTheDocument();
		console.log(authorElement);
	});
});
