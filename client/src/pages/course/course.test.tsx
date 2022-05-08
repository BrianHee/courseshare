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

	it('should render the course title', async () => {
		(axiosMock as unknown as jest.Mock).mockResolvedValueOnce({
			status: 200,
			data: {
				course: {
					title: 'How to Prepare a New York Strip'
				}
			}
		});
		await act(async () => {
			render(testElement);
		});
		// const titleElement = screen.getByText('How to Prepare a New York Strip');
		console.log(testElement);
	});
});
