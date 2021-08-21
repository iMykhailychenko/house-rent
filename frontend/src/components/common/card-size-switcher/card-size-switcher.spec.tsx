import { ReactElement } from 'react';

import { fireEvent } from '@testing-library/react';

import useConfig from '../../../hooks/config.hook';
import { render } from '../../../tests/tests.utils';

import CardSizeSwitcher from './card-size-switcher';

describe('CardSizeSwitcher component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<CardSizeSwitcher />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('change card size', () => {
        const { getByTitle } = render(<CardSizeSwitcher />);

        fireEvent.click(getByTitle('large cards'));
        expect(getByTitle('large cards').classList.contains('active')).toBeTruthy();

        fireEvent.click(getByTitle('small cards'));
        expect(getByTitle('small cards').classList.contains('active')).toBeTruthy();
    });

    it('change card size test with context', () => {
        const Component = (): ReactElement => {
            const [config] = useConfig();
            return (
                <>
                    <CardSizeSwitcher />
                    card size is: {config.cardSize}
                </>
            );
        };
        const { queryByText, getByTitle } = render(<Component />);

        fireEvent.click(getByTitle('large cards'));
        expect(queryByText('card size is: lg')).toBeInTheDocument();
        expect(queryByText('card size is: sm')).toBeNull();

        fireEvent.click(getByTitle('small cards'));
        expect(queryByText('card size is: sm')).toBeInTheDocument();
        expect(queryByText('card size is: lg')).toBeNull();
    });
});
