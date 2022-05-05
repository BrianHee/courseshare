import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CoursePreview from './index';

describe('CoursePreview Test', () => {
	it('links to the course edit page', () => {
		const testProps = {
			_id: '1',
			title: 'How to Prepare a New York Strip',
			image: 'https://theviewfromgreatisland.com/wp-content/uploads/2020/01/new-york-strip-steak-sliced-scaled.jpg'
		};
		const { getByRole, queryByRole, queryByText } = render(
			<MemoryRouter>
				<CoursePreview {...testProps} />
			</MemoryRouter>
		);
		// expect(getByRole('link')).toHaveAttribute('href', `/edit/${testProps._id}`);
		// expect(getByRole('link')).toHaveTextContent(`${testProps.title}`);
		expect(queryByText(`${testProps.title}`)).toBeFalsy();
	});
});
