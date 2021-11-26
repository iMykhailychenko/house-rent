import React from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { cutString } from '../../../../../utils/helpers/string.helper';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import StickyModal from '../../../../common/modal/components/sticky-modal/sticky-modal';
import { modal } from '../../../../common/modal/modal';
import css from '../single.module.scss';

interface IProps {
    label?: string;
    text: string | string[];
    img: string;
    title: string;
}

const ReadMoreText = ({ label, text, img, title }: IProps): JSX.Element => {
    const trans = useTrans();
    const srt = Array.isArray(text) ? text.map(trans).join(', ') : text;

    const readMore = (): void => {
        modal.open(
            <StickyModal title={title}>
                <ImageWrp name={img} />
                <div className={css.center}>
                    {label && <strong>{label}: </strong>}
                    {Array.isArray(text) ? (
                        <div className={css.chips}>
                            {text.map(item => (
                                <p key={item} className={css.chip}>
                                    {trans(item)}
                                </p>
                            ))}
                        </div>
                    ) : (
                        text
                    )}
                </div>
            </StickyModal>,
        );
    };

    return (
        <div className={css.innerText}>
            {label && <strong>{trans(label)}: </strong>}
            {cutString(srt, 40) + ' '}
            {srt.length > 40 && (
                <button className={css.link} onClick={readMore} type="button">
                    {trans('читати далі')}
                </button>
            )}
        </div>
    );
};

export default ReadMoreText;
