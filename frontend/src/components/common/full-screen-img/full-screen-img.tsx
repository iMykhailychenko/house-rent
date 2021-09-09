import React, { ReactElement, useState } from 'react';

import clsx from 'clsx';

import css from './full-screen-img.module.scss';

interface IProps {
    className?: string;
    src: string;
    height?: number;
    width?: number;
    alt?: string;
}

const FullScreenImg = ({ className, src, height, width, alt }: IProps): ReactElement => {
    const [fullscreen, setFullscreen] = useState(false);
    const open = (): void => setFullscreen(true);
    const close = (): void => setFullscreen(false);
    return (
        <>
            {fullscreen && (
                <div className={css.open}>
                    <img src={src} alt={alt} onClick={close} aria-hidden="true" />
                </div>
            )}
            <img
                className={clsx(css.base, className)}
                src={src}
                height={height}
                width={width}
                alt={alt}
                onClick={open}
                aria-hidden="true"
            />
        </>
    );
};

export default FullScreenImg;
