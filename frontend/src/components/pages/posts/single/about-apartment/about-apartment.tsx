import React, { ReactElement } from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import css from '../single.module.scss';

interface IProps {
    post: IPost;
}

const AboutApartment = ({ post }: IProps): ReactElement => {
    const trans = useTrans();

    return (
        <>
            <div className={css.wrap}>
                <h2 className={css.subtitle}>Опис житла</h2>
                <div className={css.row}>
                    <div className={css.cell}>
                        <ImageWrp name="building" />
                        <p>
                            {trans('houseType')}: {post.houseTypeFilters.map(text => trans(text)).join(', ')}
                        </p>
                    </div>

                    <div className={css.cell}>
                        <ImageWrp name="chair" />
                        <p>
                            {trans('room')}: {post.roomFilters.map(text => trans(text)).join(', ')}
                        </p>
                    </div>

                    <div className={css.cell}>
                        <ImageWrp name="cash" />
                        <p>
                            {trans('price')}: {post.priceFilters.map(text => trans(text)).join(', ')}
                        </p>
                    </div>
                </div>
                <div className={css.row}>
                    <div className={css.cell}>
                        <ImageWrp name="location" />
                        <p>
                            {post.cityFilters}: {post.districtFilters.map(text => trans(text)).join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutApartment;
