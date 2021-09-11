import React, { ReactElement } from 'react';

import { Apartment, ChildFriendly, Group, Pets, Weekend } from '@material-ui/icons';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import ChipsStatic from '../../chips-static/chips-static';

import css from './post-info-block.module.scss';

interface IProps {
    post: IPost;
}

const PostInfoBlock = ({ post }: IProps): ReactElement => (
    <>
        <div className={css.flex}>
            <div className={css.column}>
                <h5 className={css.small}>Про автора оголошення</h5>
                <div className={css.row}>
                    <ChipsStatic active chip={post.residentsAmount} tooltip="Кількість осіб що буде проживати у квартирі">
                        <Group />
                    </ChipsStatic>

                    <ChipsStatic
                        active={!!post.children}
                        chip={post.children ? 'З дітьми' : 'Без дітей'}
                        tooltip={post.children || 'Без дітей'}
                    >
                        <ChildFriendly />
                    </ChipsStatic>

                    <ChipsStatic
                        active={!!post.pets}
                        chip={post.pets ? 'Тварини' : 'Без тварин'}
                        tooltip={post.pets || 'Без тварин'}
                    >
                        <Pets />
                    </ChipsStatic>
                </div>
            </div>

            <div className={css.column}>
                <h5 className={css.small}>Квартира мрії</h5>
                <div className={css.row}>
                    <ChipsStatic active chip={post.cityFilters} tooltip="Місто">
                        <Apartment />
                    </ChipsStatic>

                    <ChipsStatic active chip={post.houseTypeFilters.join(', ')} tooltip="Тип будинку">
                        <ChildFriendly />
                    </ChipsStatic>

                    <ChipsStatic active chip={post.roomFilters.join(', ')} tooltip="Кількість кімнат">
                        <Weekend />
                    </ChipsStatic>
                </div>
            </div>
        </div>

        <div className={css.flex}>
            <div className={css.column}>
                <p className={css.small}>Бажані райони міста:</p>
                <div className={css.row}>
                    {post.districtFilters.map(item => (
                        <span className={css.chip} key={item}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className={css.column}>
                <p className={css.small}>Бажані місячна плата:</p>
                <div className={css.row}>
                    {post.priceFilters.map(item => (
                        <span className={css.chip} key={item}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </>
);

export default PostInfoBlock;
