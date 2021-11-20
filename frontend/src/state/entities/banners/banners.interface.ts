export enum BannerType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}

export interface Banner {
    id: string;
    type: BannerType;
    content: JSX.Element[] | JSX.Element | string;
}
