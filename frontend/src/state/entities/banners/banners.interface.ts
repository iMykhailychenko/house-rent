export enum BannerType {
    ERROR = 0,
    WARNING = 1,
    INFO = 2,
}

export interface Banner {
    id: string;
    type: BannerType;
    content: JSX.Element[] | JSX.Element | string;
}
