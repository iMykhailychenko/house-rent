import { IUser } from '../../../interfaces';
import { ThunkStatuses } from '../../interfaces';

export interface IUserState {
    status: ThunkStatuses;
    data: IUser;
}
