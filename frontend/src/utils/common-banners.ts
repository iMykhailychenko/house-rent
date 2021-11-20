import { Banner, BannerType } from '../state/entities/banners/banners.interface';

export const POST_IN_ARCHIVE: Banner = {
    id: 'POST_IN_ARCHIVE',
    type: BannerType.ERROR,
    content:
        'УВАГА! Цей пост знаходиться в архіві. Щоб інші користувачі могли його побачити вам потрібно змінити статус цього посту на активний!',
};

export const POST_IN_DRAFT: Banner = {
    id: 'POST_IN_DRAFT',
    type: BannerType.INFO,
    content:
        'УВАГА! Цей пост не активований. Щоб інші користувачі могли його побачити вам потрібно змінити статус цього посту на активний!',
};

export const VALIDATE_EMAIL_WARN: Banner = {
    id: 'VALIDATE_EMAIL_WARN',
    type: BannerType.WARNING,
    content:
        'Ви не активували вашу електронну пошту. Щоб повною мірою використовувати функціонал сайту перейдіть за посиланням в листі',
};

export const VALIDATE_EMAIL_ERROR: Banner = {
    id: 'VALIDATE_EMAIL_ERROR',
    type: BannerType.ERROR,
    content:
        'Ви не активували вашу електронну пошту. Щоб повною мірою використовувати функціонал сайту перейдіть за посиланням в листі',
};
