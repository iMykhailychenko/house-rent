import { IUser, Pagination } from '../../../interfaces';
import { ThunkStatuses } from '../../interfaces';
import { City } from '../filters/filters.interface';

export enum POST_STATUS {
    DRAFT = 'draft',
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

export const ALL_STATUSES = [POST_STATUS.DRAFT, POST_STATUS.ACTIVE, POST_STATUS.ARCHIVE];

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
    createdAt: string;
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

export interface IStepThree {
    title: string;
    description: string;
}

export type INewPostPayload = IStepOne & IStepTwo & IStepThree & { image?: string | null };

export interface IEditPostPayload {
    id: number;
    body: Partial<IPost>;
}

export interface IUserPostsListPayload {
    userId: number;
    page: number;
}

export interface IPersonalPostsListPayload {
    status: POST_STATUS;
    page: number;
}

export enum FORM_TYPE {
    ONE = 'one',
    TWO = 'two',
    THREE = 'three',
    FOUR = 'four',
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

export type IPostListState = Pagination<IPost> & { error: string | null; status: ThunkStatuses };

export interface IPostState {
    new: INewPostState;
    update: IUpdatePostState;
    single: ISinglePostState;
    list: IPostListState;
}
