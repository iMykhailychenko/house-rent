import { ISearchFilters } from '../interfaces';
import { IAuthInitialState } from './entities/auth/auth.interface';

export type ThunkStatuses = 'idle' | 'loading' | 'success' | 'error';

export interface IState {
    auth: IAuthInitialState;
    filters: ISearchFilters;
}
