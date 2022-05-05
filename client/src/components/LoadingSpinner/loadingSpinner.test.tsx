import { render, screen } from '@testing-library/react';

import LoadingSpinner from './index';

describe('LoadingSpinner Test', () => {
	const testElement = <LoadingSpinner />;

	it('should render a loading spinner', () => {
		render(testElement);
		const loadingSpinner = screen.getByText(/loading/i, { exact: false });
		expect(loadingSpinner).toBeInTheDocument();
	});
});
