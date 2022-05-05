import { render, screen } from '@testing-library/react';

import Modal from './index';

describe('Modal test', () => {
	const testProps = {
		type: 'course' as const,
		onConfirm: () => null,
		onClose: () => null
	};

	const testElement = (
		<Modal type={testProps.type} onConfirm={testProps.onConfirm} onClose={() => testProps.onClose} />
	);

	it('should render a modal with type "course"', () => {
		render(testElement);
		const modalElement = screen.getByText(/course/i);
		expect(modalElement).toBeInTheDocument();
	});
});
