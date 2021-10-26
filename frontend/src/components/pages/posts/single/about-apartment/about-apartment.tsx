import React, { ReactElement } from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import ReadMoreText from '../read-more-text/read-more-text';
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
                            <strong>{trans('houseType')}</strong>: {post.houseTypeFilters.map(trans).join(', ')}
                        </p>
                    </div>

                    <div className={css.cell}>
                        <ImageWrp name="chair" />
                        <p>
                            <strong>{trans('rooms')}</strong>: {post.roomFilters.map(trans).join(', ')}
                        </p>
                    </div>

                    <div className={css.cell}>
                        <ImageWrp name="coin" />
                        <ReadMoreText
                            img="coin"
                            title="cash"
                            label={trans('price')}
                            text={post.priceFilters.map(trans).join(', ')}
                        />
                    </div>
                </div>
                <div className={css.row}>
                    <div className={css.cell}>
                        <ImageWrp name="location" />
                        <p>
                            <strong>{trans('city')}</strong>: {trans(post.cityFilters)}
                        </p>
                    </div>
                    <div className={css.cell}>
                        <ImageWrp name="target" />
                        <ReadMoreText
                            img="target"
                            title="district"
                            label={trans('district')}
                            text={post.districtFilters.map(trans).join(', ')}
                        />
                    </div>
                    <div style={{ width: '20rem' }} />
                </div>
            </div>
        </>
    );
};

export default AboutApartment;
