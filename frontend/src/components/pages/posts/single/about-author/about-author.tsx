import React, { ReactElement } from 'react';

import clsx from 'clsx';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import { modal } from '../../../../common/modal/modal';
import StickyModal from '../../../../common/modal/sticky-modal/sticky-modal';
import ReadMoreText from '../read-more-text/read-more-text';
import css from '../single.module.scss';

interface IProps {
    post: IPost;
}

const AboutAuthor = ({ post }: IProps): ReactElement => {
    const trans = useTrans();

    const readMore =
        (img: string, title: string, text: string): (() => void) =>
        (): void => {
            modal.open(
                <StickyModal title={title}>
                    <ImageWrp name={img} />
                    <p className={css.center}>{trans(text)}</p>
                </StickyModal>,
            );
        };

    return (
        <div className={css.wrap}>
            <h2 className={css.subtitle}>Про автора оголошення</h2>
            <div className={css.row}>
                <div className={css.cell}>
                    <ImageWrp name="user" />
                    <p>
                        {trans('residentsAmount')}: {post.residentsAmount}
                    </p>
                </div>

                <div className={clsx(css.cell, { [css.gray]: !post.pets })}>
                    <ImageWrp name="bird" />
                    <ReadMoreText text={post.pets || 'Без тварин'} img="bird" title="pets" />
                </div>

                <div className={clsx(css.cell, { [css.gray]: !post.children })}>
                    <ImageWrp name="skateboard" />
                    <ReadMoreText text={post.children || 'Без дітей'} img="skateboard" title="children" />
                </div>
            </div>
        </div>
    );
};

export default AboutAuthor;
