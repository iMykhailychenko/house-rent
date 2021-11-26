import React from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import ReadMoreText from '../read-more-text/read-more-text';
import css from '../single.module.scss';

interface IProps {
    post: IPost;
}

const AboutApartment = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();

    return (
        <>
            <div className={css.wrap}>
                <h2 className={css.subtitle}>Опис житла</h2>
                <div className={css.row}>
                    <div className={css.cell}>
                        <ImageWrp name="building" />
                        <p className={css.innerText}>
                            <strong>{trans('houseType')}</strong>: {post.houseTypeFilters.map(trans).join(', ')}
                        </p>
                    </div>

                    <div className={css.cell}>
                        <ImageWrp name="chair" />
                        <ReadMoreText img="chair" title="rooms" label="rooms" text={post.roomFilters} />
                    </div>

                    <div className={css.cell}>
                        <ImageWrp name="coin" />
                        <ReadMoreText img="coin" title="cash" label="price" text={post.priceFilters} />
                    </div>
                </div>
                <div className={css.row}>
                    <div className={css.cell}>
                        <ImageWrp name="location" />
                        <p className={css.innerText}>
                            <strong>{trans('city')}</strong>: {trans(post.cityFilters)}
                        </p>
                    </div>
                    <div className={css.cell}>
                        <ImageWrp name="target" />
                        <ReadMoreText img="target" title="district" label="district" text={post.districtFilters} />
                    </div>
                    <div style={{ width: '20rem' }} />
                </div>
            </div>
        </>
    );
};

export default AboutApartment;
