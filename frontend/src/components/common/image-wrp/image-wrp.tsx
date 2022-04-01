import React from 'react';

import { cutString } from '../../../utils/helpers/string.helper';

import css from './image-wrp.module.scss';

interface IProps {
    name: string;
    alt?: string;
}

const ImageWrp = ({ name, alt = '' }: IProps): JSX.Element => (
    <div className={css.img}>
        <div className={css.inner}>
            <img src={`/icons/${name}.png`} alt={alt ? cutString(alt, 80) : ''} draggable="false" />
        </div>
    </div>
);

export default ImageWrp;
