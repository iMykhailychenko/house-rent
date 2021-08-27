import { fireEvent, render } from '@testing-library/react';

import Textarea from './textarea';

describe('Textarea component', () => {
    it('matches snapshot', () => {
        const handleChange = jest.fn();
        const { asFragment } = render(
            <Textarea
                value="test"
                onChange={handleChange}
                id="test"
                className="test"
                name="test"
                placeholder="test"
                error="error"
            />,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('password', () => {
        const handleChange = jest.fn();
        const { queryByText } = render(<Textarea value="test" onChange={handleChange} />);

        expect(queryByText('label')).toBeFalsy();
        expect(queryByText('error')).toBeFalsy();
    });

    it('error', () => {
        const handleChange = jest.fn();
        const { queryByText } = render(<Textarea value="test" onChange={handleChange} error="error" />);

        expect(queryByText('label')).toBeFalsy();
        expect(queryByText('error')).toBeInTheDocument();
    });

    it('label', () => {
        const handleChange = jest.fn();
        const { queryByText } = render(<Textarea value="test" onChange={handleChange} label="label" />);

        expect(queryByText('error')).toBeFalsy();
        expect(queryByText('label')).toBeTruthy();
    });

    it('events', () => {
        const handleChange = jest.fn();
        const handleBlur = jest.fn();
        const handleFocus = jest.fn();
        const handleKeyDown = jest.fn();
        const { getByPlaceholderText } = render(
            <Textarea
                value="test"
                placeholder="input"
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
            />,
        );

        fireEvent.focus(getByPlaceholderText('input'));
        expect(handleFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(getByPlaceholderText('input'));
        expect(handleBlur).toHaveBeenCalledTimes(1);

        fireEvent.change(getByPlaceholderText('input'), { target: { value: 'abc' } });
        expect(handleChange).toHaveBeenCalledTimes(1);

        fireEvent.keyDown(getByPlaceholderText('input'));
        expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
});
