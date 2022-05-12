import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BlockB from './index';

global.IntersectionObserver = class IntersectionObserver {
	constructor() {}

	disconnect() {
		return null;
	}

	observe() {
		return null;
	}

	takeRecords() {
		return null;
	}

	unobserve() {
		return null;
	}
};

describe('BlockB test', () => {
	const testElement = (
		<MemoryRouter>
			<BlockB />
		</MemoryRouter>
	);

	it('should render section A', () => {
		render(testElement);
		const sectionElement = screen.getByAltText(/imageA/i);
		expect(sectionElement).toBeInTheDocument();
	});
	it('should render section B', () => {
		render(testElement);
		const sectionElement = screen.getByAltText(/imageB/i);
		expect(sectionElement).toBeInTheDocument();
	});
	it('should render section C', () => {
		render(testElement);
		const sectionElementOne = screen.getByAltText(/imageD/i);
		const sectionElementTwo = screen.getByAltText(/imageE/i);
		expect(sectionElementOne).toBeInTheDocument();
		expect(sectionElementTwo).toBeInTheDocument();
	});
});
