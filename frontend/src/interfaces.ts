import { AxiosResponse } from 'axios';

export type TransFn = (value: string) => string;

export interface IUser {
    id: number;
    createdAt: string;
    lastActivity: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    email: string;
    role: UserRole[];
}

export interface IRecentPost {
    id: number;
    title: string;
    img: string | null;
    date: number;
}

export interface IChips {
    name: string;
    active: boolean;
    icon?: string;
    hover?: string;
}

export interface IChipsMap {
    [key: string]: IChips;
}

export enum THEME_ENUM {
    WHITE = 'white',
    BLACK = 'black',
}

export enum LANGUAGE_ENUM {
    RU = 'ru',
    UA = 'ua',
}

export interface IContent {
    [key: string]: string;
}

export interface ILocales {
    [key: string]: IContent;
}

export interface IConfig {
    cardSize: 'sm' | 'md' | 'lg';
    chatFontSize: number;
}

export enum UserRole {
    USER = 'user',
    REALTOR = 'realtor',
}

export interface SelectValue {
    id: string;
    value: string;
}

export type SelectList = SelectValue[];

export type Pagination<T> = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: T[];
};

export type Response<T> = Promise<AxiosResponse<T>>;

export interface Params {
    [key: string]: unknown;
}
