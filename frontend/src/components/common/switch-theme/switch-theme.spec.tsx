import useTheme from '../../../hooks/theme.hook';
import { fireEvent, render } from '../../../tests/tests.utils';

import SwitchTheme from './switch-theme';

describe('SwitchTheme component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<SwitchTheme />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('toggle theme', () => {
        const Component = () => {
            const [theme] = useTheme();
            return (
                <>
                    <SwitchTheme />
                    {theme}
                </>
            );
        };
        const { getByRole, queryByText } = render(<Component />);

        expect(queryByText('white')).toBeTruthy();
        expect(queryByText('black')).toBeFalsy();

        fireEvent.click(getByRole('button'));
        expect(queryByText('black')).toBeTruthy();
        expect(queryByText('white')).toBeFalsy();
    });
});
