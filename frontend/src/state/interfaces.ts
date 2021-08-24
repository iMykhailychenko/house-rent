import { IAuthState } from './entities/auth/auth.interface';
import { IFiltersState } from './entities/filters/filters.interface';
import { IProfileInfoState } from './entities/profile/profile.interface';

export type ThunkStatuses = 'idle' | 'loading' | 'success' | 'error';

export interface IState {
    auth: IAuthState;
    filters: IFiltersState;
    profile: IProfileInfoState;
}
