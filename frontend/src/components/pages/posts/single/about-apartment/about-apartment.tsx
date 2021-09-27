import React, { ReactElement } from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import css from '../single.module.scss';
import ReadMoreText from '../read-more-text/read-more-text';

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
                        <ReadMoreText
                            img="cash"
                            title="cash"
                            text={trans('price') + ': ' + post.priceFilters.map(text => trans(text)).join(', ')}
                        />
                    </div>
                </div>
                <div className={css.row}>
                    <div className={css.cell}>
                        <ImageWrp name="location" />
                        <p>
                            {trans('city')}: {trans(post.cityFilters)}
                        </p>
                    </div>
                    <div className={css.cell}>
                        <ImageWrp name="target" />
                        <ReadMoreText
                            img="target"
                            title="district"
                            text={trans('district') + ': ' + post.districtFilters.map(text => trans(text)).join(', ')}
                        />
                    </div>
                    <div style={{ width: '20rem' }} />
                </div>
            </div>
        </>
    );
};

export default AboutApartment;
