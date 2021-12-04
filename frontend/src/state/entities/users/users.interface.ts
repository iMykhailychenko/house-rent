import { IUser } from '../../../interfaces';
import { LoadingStatus } from '../../interfaces';

export interface IUserState {
    status: LoadingStatus;
    data: IUser;
}
