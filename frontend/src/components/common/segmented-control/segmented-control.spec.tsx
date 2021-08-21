import { fireEvent, render } from '@testing-library/react';

import SegmentedControl from './segmented-control';

const mockSegments = [
    { id: 'test', name: 'test' },
    { id: 'test1', name: 'test1' },
    { id: 'test2', name: 'test2' },
];

describe('SegmentedControl component', () => {
    it('matches snapshot', () => {
        const handleChange = jest.fn();
        const { asFragment } = render(<SegmentedControl value={mockSegments} active="test" onChange={handleChange} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('toggle active segment', () => {
        const handleChange = jest.fn();
        const { getByTitle, getByText } = render(<SegmentedControl value={mockSegments} active="test" onChange={handleChange} />);
        expect(getByTitle('test').classList.contains('active')).toBeTruthy();

        fireEvent.click(getByText('test2'));
        expect(handleChange).toHaveBeenCalledWith('test2');
    });
});
