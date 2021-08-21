import { fireEvent } from '@testing-library/react';

import filtersInitialState from '../../../state/entities/filters/filters.initial-state';
import { render } from '../../../tests/tests.utils';

import Chips from './chips';

describe('Chips component', () => {
    it('matches snapshot', () => {
        const handleChange = jest.fn();
        const { asFragment } = render(<Chips chips={filtersInitialState.room} onChange={handleChange} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('change filter', () => {
        const handleChange = jest.fn();
        const { getByTitle } = render(<Chips chips={filtersInitialState.room} onChange={handleChange} />);

        fireEvent.click(getByTitle('one'));
        expect(handleChange).toHaveBeenCalledWith(['one']);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
