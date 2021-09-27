import React, { ReactElement } from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { cutString } from '../../../../../utils/helpers';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import { modal } from '../../../../common/modal/modal';
import StickyModal from '../../../../common/modal/sticky-modal/sticky-modal';
import css from '../single.module.scss';

interface IProps {
    text: string;
    img: string;
    title: string;
}

const ReadMoreText = ({ text, img, title }: IProps): ReactElement => {
    const trans = useTrans();

    const readMore = (): void => {
        modal.open(
            <StickyModal title={title}>
                <ImageWrp name={img} />
                <p className={css.center}>{trans(text)}</p>
            </StickyModal>,
        );
    };

    return (
        <p>
            {cutString(text, 45) + ' '}
            {text.length > 45 && (
                <button className={css.link} onClick={readMore} type="button">
                    {trans('читати далі')}
                </button>
            )}
        </p>
    );
};

export default ReadMoreText;
