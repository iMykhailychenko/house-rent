import { ThunkStatuses } from '../../interfaces';
import { City } from '../filters/filters.interface';
import { IUser } from '../profile/profile.interface';

export interface INewPostPayload {
    title: string;
    description: string;
    houseTypeFilters: string[];
    roomFilters: string[];
    priceFilters: string[];
    cityFilters: City;
    districtFilters: string[];
}

export interface IEditPostPayload {
    id: number;
    body: Partial<INewPostResponse>;
}

export interface INewPostResponse {
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
    isActive: boolean;
    user: IUser;
}

export interface INewPostState {
    postStatus: ThunkStatuses;
    imgStatus: ThunkStatuses;
    data: INewPostResponse | null;
    error: string | null;
}

export interface IEditPostState {
    status: ThunkStatuses;
    error: string | null;
}

export interface IPostState {
    new: INewPostState;
    edit: IEditPostState;
}
