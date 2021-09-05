import React, { ReactElement } from 'react';

import css from './image-wrp.module.scss';

interface IProps {
    name: string;
    alt?: string;
}

const ImageWrp = ({ name, alt = '' }: IProps): ReactElement => (
    <div className={css.img}>
        <div className={css.inner}>
            <img src={`/icons/${name}.png`} alt={alt} draggable="false" />
        </div>
    </div>
);

export default ImageWrp;
