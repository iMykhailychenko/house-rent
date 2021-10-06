import { render } from '@testing-library/react';

import UserAvatar from './user-avatar';

describe('UserAvatar component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<UserAvatar firstName="firstName" lastName="lastName" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('without img', () => {
        const { getByText, queryByTitle } = render(<UserAvatar firstName="firstName" lastName="lastName" />);
        expect(getByText('fl')).toBeInTheDocument();
        expect(queryByTitle('User avatar')).toBeFalsy();
    });

    it('with img', () => {
        const { queryByText, getByTitle } = render(<UserAvatar src="/test" firstName="firstName" lastName="lastName" />);
        expect(queryByText('fl')).toBeFalsy();
        expect(getByTitle('User avatar')).toBeInTheDocument();
    });
});
