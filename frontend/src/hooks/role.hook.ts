import { UserRole } from '../interfaces';
import { useProfileInfoSelector } from '../state/entities/profile/profile.selector';

interface IRole {
    isUser: boolean;
    isRealtor: boolean;
}
export const useRole = (): IRole => {
    const userState = useProfileInfoSelector();

    return {
        isUser: userState.data.role.includes(UserRole.USER),
        isRealtor: userState.data.role.includes(UserRole.REALTOR),
    };
};
