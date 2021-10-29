import { render } from '@testing-library/react';

import { IUser, UserRole } from '../../../../interfaces';

import UserCard from './user-card';

const mockUser: IUser = {
    id: 1,
    createdAt: '1-1-1991',
    lastActivity: '1-1-1991',
    avatar: null,
    isEmailVerified: false,
    email: 'eee@ee.com',
    firstName: 'firstName',
    lastName: 'lastName',
    role: [UserRole.USER],
};

describe('UserCard component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<UserCard user={mockUser} className="test" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
