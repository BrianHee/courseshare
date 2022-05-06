import { render, screen } from '@testing-library/react';

import ShareButton from './index';

describe('ShareButton test', () => {
	const testElement = <ShareButton />;

	it('should render a button', () => {
		render(testElement);
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toBeInTheDocument();
	});
});
