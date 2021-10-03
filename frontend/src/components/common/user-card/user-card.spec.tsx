import { render } from '@testing-library/react';

import { IUser } from '../../../interfaces';

import UserCard from './user-card';

const mockUser: IUser = {
    id: 1,
    creationDate: '1-1-1991',
    lastActivity: '1-1-1991',
    avatar: null,
    isEmailVerified: false,
    email: 'eee@ee.com',
    firstName: 'firstName',
    lastName: 'lastName',
    role: null,
};

describe('UserCard component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<UserCard user={mockUser} className="test" date="date" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
