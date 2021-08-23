import { ISearchFilters } from '../interfaces';

import { IAuthInitialState } from './entities/auth/auth.interface';
import { IProfileInfoState } from './entities/profile/profile.interface';

export type ThunkStatuses = 'idle' | 'loading' | 'success' | 'error';

export interface IState {
    auth: IAuthInitialState;
    filters: ISearchFilters;
    profile: IProfileInfoState;
}
