import React, { ReactElement } from 'react';

import { Apartment, ChildFriendly, Group, HomeWork, Pets, Weekend } from '@material-ui/icons';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import ChipsStatic from '../../../chips-static/chips-static';

import css from './post-info-block.module.scss';

interface IProps {
    post: IPost;
}

const PostInfoBlock = ({ post }: IProps): ReactElement => {
    const trans = useTrans();

    return (
        <>
            <div className={css.flex}>
                <div className={css.column}>
                    <h5 className={css.small}>{trans('about_author_of_the_post')}</h5>
                    <div className={css.row}>
                        <ChipsStatic active chip={post.residentsAmount} tooltip="residentsAmount">
                            <Group />
                        </ChipsStatic>

                        <ChipsStatic
                            active={!!post.children}
                            chip={post.children ? trans('children') : trans('no_children')}
                            tooltip={post.children || trans('no_children')}
                        >
                            <ChildFriendly />
                        </ChipsStatic>

                        <ChipsStatic
                            active={!!post.pets}
                            chip={post.pets ? trans('pets') : trans('no_pets')}
                            tooltip={post.pets || trans('no_pets')}
                        >
                            <Pets />
                        </ChipsStatic>
                    </div>
                </div>

                <div className={css.column}>
                    <h5 className={css.small}>Квартира мрії</h5>
                    <div className={css.row}>
                        <ChipsStatic active chip={trans(post.cityFilters)} tooltip="city">
                            <Apartment />
                        </ChipsStatic>

                        <ChipsStatic active chip={trans(post.houseTypeFilters.map(trans).join(', '))} tooltip="houseType">
                            <HomeWork />
                        </ChipsStatic>

                        {post.roomFilters.map(item => (
                            <ChipsStatic key={item} active chip={trans(item)} tooltip="rooms">
                                <Weekend />
                            </ChipsStatic>
                        ))}
                    </div>
                </div>
            </div>

            <div className={css.flex}>
                <div className={css.column}>
                    <p className={css.small}>Бажані райони міста:</p>
                    <div className={css.row}>
                        {post.districtFilters.map(item => (
                            <span className={css.chip} key={item}>
                                {trans(item)}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={css.column}>
                    <p className={css.small}>Бажані місячна плата:</p>
                    <div className={css.row}>
                        {post.priceFilters.map(item => (
                            <span className={css.chip} key={item}>
                                {trans(item)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostInfoBlock;
