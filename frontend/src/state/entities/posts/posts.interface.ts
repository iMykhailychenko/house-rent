import { ThunkStatuses } from '../../interfaces';
import { City } from '../filters/filters.interface';
import { IUser } from '../profile/profile.interface';

export enum POST_STATUS {
    INITIAL = 'initial',
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export interface IPost {
    id: number;
    title: string;
    description: string;
    image: string | null;
    cityFilters: string;
    creationDate: string;
    districtFilters: string[];
    generalFilters: string[] | null;
    houseTypeFilters: string[];
    priceFilters: string[];
    roomFilters: string[];
    status: POST_STATUS;
    user: IUser;
}

export interface INewPostPayload {
    title: string;
    description: string;
    residentsAmount: string[];
    children: string;
    houseTypeFilters: string[];
    roomFilters: string[];
    priceFilters: string[];
    cityFilters: City;
    districtFilters: string[];
}

export interface IEditPostPayload {
    id: number;
    body: Partial<IPost>;
}

export interface INewPostState {
    postStatus: ThunkStatuses;
    imgStatus: ThunkStatuses;
    data: IPost | null;
    error: string | null;
}

export interface IEditPostState {
    status: ThunkStatuses;
    error: string | null;
}

export interface ISinglePostState {
    status: ThunkStatuses;
    error: string | null;
    data: IPost;
}

export interface IPostState {
    new: INewPostState;
    edit: IEditPostState;
    single: ISinglePostState;
}
