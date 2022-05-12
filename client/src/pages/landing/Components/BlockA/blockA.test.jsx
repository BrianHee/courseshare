import { render, screen } from '@testing-library/react';

import BlockA from './index';

describe('BlockA test', () => {
	const testElement = <BlockA />;

	it('should render the header', () => {
		render(testElement);
		const headerOne = screen.getByText(/learn/i);
		const headerTwo = screen.getByText(/teach/i);
		const headerThree = screen.getByText(/share/i);
		[headerOne, headerTwo, headerThree].forEach((ele) => {
			expect(ele).toBeInTheDocument();
		});
	});

	it('should render the blockA image', () => {
		render(testElement);
		const imageElement = screen.getByAltText(/blocka/i);
		expect(imageElement).toBeInTheDocument();
	});
});
