import { fireEvent, render } from '@testing-library/react';

import Switch from './switch';

describe('Switch component', () => {
    describe('Switch small', () => {
        it('matches snapshot', () => {
            const { asFragment } = render(<Switch size="sm" className="test" value={false} width={10} />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('toggle small', () => {
            const handleChange = jest.fn();
            const { getByRole } = render(<Switch size="sm" value={false} onChange={handleChange} />);
            fireEvent.click(getByRole('button'));
            expect(handleChange).toHaveBeenCalledWith(true);
            expect(handleChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('Switch large', () => {
        it('matches snapshot', () => {
            const { asFragment } = render(
                <Switch size="lg" className="test" value={false} labels={['test-left', 'test-right']} width={10} />,
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('toggle large', () => {
            const handleChange = jest.fn();
            const { getByRole } = render(
                <Switch size="lg" value={false} onChange={handleChange} labels={['test-left', 'test-right']} />,
            );
            fireEvent.click(getByRole('button'));
            expect(handleChange).toHaveBeenCalledWith(true);
            expect(handleChange).toHaveBeenCalledTimes(1);
        });
    });
});
