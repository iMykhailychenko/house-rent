import { IUser, Pagination } from '../../../interfaces';
import { CommonState, ErrorState, LoadingStatus } from '../../interfaces/common';
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
    residentsAmount: string;
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
    favorite: number;
    chats: number;
}

export interface IStepOne {
    residentsAmount: string;
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
    body: INewPostPayload;
}

export interface IEditPostStatusPayload {
    id: number;
    status: POST_STATUS;
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

export type IPostListState = Pagination<IPost> & { error: ErrorState; status: LoadingStatus };

export interface IPostState {
    new: CommonState<IPost | null> & { formType: FORM_TYPE };
    update: CommonState<null>;
    single: CommonState<IPost>;
    list: IPostListState;
    config: CommonState<{ [id: string]: IPost & { isFavorite: boolean } }>;
}
