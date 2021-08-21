import { fireEvent, render } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Button>test button</Button>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot props', () => {
        const { asFragment, queryByAltText } = render(
            <Button primary type="submit" className="test">
                test button
            </Button>,
        );
        expect(asFragment()).toMatchSnapshot();
        expect(queryByAltText(/loading/i)).toBeNull();
    });

    it('click event', () => {
        const handleClick = jest.fn();
        const screen = render(<Button onClick={handleClick}>test button</Button>);
        fireEvent.click(screen.getByText(/test button/i).parentNode as Element);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('loading', () => {
        const screen = render(<Button loading>test button</Button>);
        expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
        expect(screen.getByAltText(/loading/i)).toHaveAttribute('src');
    });
});
