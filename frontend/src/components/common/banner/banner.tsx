import React, { Component } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import { EventEmitter } from 'events';

import showAllBanners from '../modal/modals/show-all-banners/show-all-banners';

import { Banner } from './banner.interface';
import css from './banner.module.scss';

class BannerManagement extends EventEmitter {
    public banners: Banner[];

    constructor() {
        super();
        this.banners = [];
    }

    add = (banner: Banner): void => {
        if (!this.banners.some(({ id }) => id === banner.id)) {
            this.banners.unshift(banner);
            this.emit('banner', this.banners);
        }
    };

    remove = (id: string): void => {
        this.banners = this.banners.filter(banner => banner.id !== id);
        this.emit('banner', this.banners);
    };

    removeAll = (): void => {
        this.banners = [];
        this.emit('banner', this.banners);
    };
}

export const banner = new BannerManagement();

interface IState {
    banners: Banner[];
}

export default class BannerComponent extends Component<unknown, IState> {
    public state: IState = {
        banners: [],
    };

    componentDidMount(): void {
        banner.on('banner', this.handleModal);
    }

    componentWillUnmount(): void {
        banner.off('banner', this.handleModal);
    }

    handleModal = (banners: Banner[]): void => {
        this.setState({ banners });
    };

    render(): JSX.Element {
        const { banners } = this.state;

        return (
            <div className={clsx(css.root, banners[0] && css.open, css[banners[0]?.type])}>
                <div className={css.content}>{banners[0]?.content}</div>

                <div className={css.flex}>
                    {banners.length > 1 && (
                        <button className={css.more} type="button" onClick={() => showAllBanners(banners)}>
                            Всього ({banners.length})
                        </button>
                    )}
                    <button className={css.close} type="button" onClick={() => banner.remove(banners[0]?.id)}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
        );
    }
}
