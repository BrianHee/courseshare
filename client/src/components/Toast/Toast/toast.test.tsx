import { render, screen } from '@testing-library/react';

import Toast from './index';

describe('Toast test', () => {
	const testSuccessProps = {
		type: 'success',
		message: 'Successfully saved lesson',
		onClose: () => null
	};

	const testDeleteProps = {
		type: 'delete',
		message: 'Successfully deleted lesson',
		onClose: () => null
	};

	const testSuccessElement = <Toast {...testSuccessProps} />;
	const testDeleteElement = <Toast {...testDeleteProps} />;

	it('should render a toaster with type "success"', () => {
		render(testSuccessElement);
		const modalElement = screen.getByText(/success/i);
		expect(modalElement).toBeInTheDocument();
	});

	it('shoudl render a toaster with type "delete"', () => {
		render(testDeleteElement);
		const modalElement = screen.getByText(/delete/i);
		expect(modalElement).toBeInTheDocument();
	});
});
