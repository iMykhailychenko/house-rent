import React from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { cutString } from '../../../../../utils/helpers';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import StickyModal from '../../../../common/modal/components/sticky-modal/sticky-modal';
import { modal } from '../../../../common/modal/modal';
import css from '../single.module.scss';

interface IProps {
    label?: string;
    text: string;
    img: string;
    title: string;
}

const ReadMoreText = ({ label, text, img, title }: IProps): JSX.Element => {
    const trans = useTrans();

    const readMore = (): void => {
        modal.open(
            <StickyModal title={title}>
                <ImageWrp name={img} />
                <p className={css.center}>
                    {label && <strong>{label}: </strong>}
                    {text}
                </p>
            </StickyModal>,
        );
    };

    return (
        <p>
            {label && <strong>{label}: </strong>}
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
