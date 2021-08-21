import { render } from '@testing-library/react';

import { IUser } from '../../../interfaces';

import UserCard from './user-card';

const mockUser: IUser = {
    firstName: 'firstName',
    lastName: 'lastName',
};

describe('UserCard component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<UserCard user={mockUser} className="test" date="date" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
