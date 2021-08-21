import { fireEvent, render } from '@testing-library/react';

import Input from './input';

describe('Input component', () => {
    it('matches snapshot', () => {
        const handleChange = jest.fn();
        const { asFragment } = render(
            <Input
                value="test"
                onChange={handleChange}
                id="test"
                className="test"
                name="test"
                type="password"
                placeholder="test"
                error="error"
                autoComplete="name"
            />,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('password', () => {
        const handleChange = jest.fn();
        const { queryByRole, queryByText } = render(<Input value="test" onChange={handleChange} type="password" />);

        expect(queryByText('label')).toBeFalsy();
        expect(queryByText('error')).toBeFalsy();

        expect(queryByRole('button')).toBeInTheDocument();
    });

    it('error', () => {
        const handleChange = jest.fn();
        const { queryByRole, queryByText } = render(<Input value="test" onChange={handleChange} error="error" />);

        expect(queryByRole('button')).toBeFalsy();
        expect(queryByText('label')).toBeFalsy();

        expect(queryByText('error')).toBeInTheDocument();
    });

    it('label', () => {
        const handleChange = jest.fn();
        const { queryByRole, queryByText } = render(<Input value="test" onChange={handleChange} label="label" />);

        expect(queryByRole('button')).toBeFalsy();
        expect(queryByText('error')).toBeFalsy();

        expect(queryByText('label')).toBeTruthy();
    });

    it('events', () => {
        const handleChange = jest.fn();
        const handleBlur = jest.fn();
        const handleFocus = jest.fn();
        const handleKeyDown = jest.fn();
        const { getByPlaceholderText } = render(
            <Input
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
