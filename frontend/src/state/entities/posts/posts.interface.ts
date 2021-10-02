import { ThunkStatuses } from '../../interfaces';
import { City } from '../filters/filters.interface';
import { IUser } from '../profile/profile.interface';

export enum POST_STATUS {
    IDLE = 'idle',
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export const ALL_STATUSES = [POST_STATUS.IDLE, POST_STATUS.DRAFT, POST_STATUS.ACTIVE, POST_STATUS.ARCHIVE];

export interface IPost {
    id: number;
    title: string;
    description: string;
    image: string | null;
    residentsAmount: number;
    children: string;
    pets: string;
    views: number;
    cityFilters: string;
    creationDate: string;
    districtFilters: string[];
    generalFilters: string[] | null;
    houseTypeFilters: string[];
    priceFilters: string[];
    roomFilters: string[];
    status: POST_STATUS;
    user: IUser;
    isFavorite: boolean;
    favorite: number;
    chats: number;
}

export interface IStepOne {
    title: string;
    description: string;
    residentsAmount: number | string;
    children: string;
    pets: string;
}

export interface IStepTwo {
    houseTypeFilters: string[];
    roomFilters: string[];
    priceFilters: string[];
    cityFilters: City;
    districtFilters: string[];
}

export type INewPostPayload = IStepOne & IStepTwo & { image?: string | null };

export interface IEditPostPayload {
    id: number;
    body: Partial<IPost>;
}

export interface UserPostsListParams {
    limit?: number;
    page?: number;
    status?: POST_STATUS[];
}

export interface IUserPostsListPayload {
    userId: number;
    params: UserPostsListParams;
}

export enum FORM_TYPE {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three',
    DONE = 'done',
}

export interface INewPostState {
    formType: FORM_TYPE;
    status: ThunkStatuses;
    data: IPost | null;
    error: string | null;
}

export interface IUpdatePostState {
    status: ThunkStatuses;
    error: string | null;
}

export interface ISinglePostState {
    status: ThunkStatuses;
    error: string | null;
    data: IPost;
}

export interface IPostListState {
    error: string | null;
    status: ThunkStatuses;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: IPost[];
}

export interface IPostState {
    new: INewPostState;
    update: IUpdatePostState;
    single: ISinglePostState;
    list: IPostListState;
}
