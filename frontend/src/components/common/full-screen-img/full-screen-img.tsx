import React, { useState, KeyboardEvent, useRef } from 'react';

import clsx from 'clsx';

import FullScreenImgModal from './full-screen-img-modal';
import css from './full-screen-img.module.scss';

interface IProps {
    className?: string;
    src: string;
    height?: number;
    width?: number;
    alt?: string;
}

const FullScreenImg = ({ className, src, height, width, alt }: IProps): JSX.Element => {
    const ref = useRef<HTMLImageElement>(null);

    const [fullscreen, setFullscreen] = useState(false);
    const open = (): void => setFullscreen(true);
    const close = (): void => {
        setFullscreen(false);
        setTimeout(() => {
            ref.current?.focus();
        }, 100);
    };

    const keyboard = (event: KeyboardEvent<HTMLImageElement>): void => {
        if (event.code === 'Enter') {
            setFullscreen(true);
        }
    };

    return (
        <>
            {fullscreen && <FullScreenImgModal src={src} alt={alt} onClick={close} />}
            <img
                ref={ref}
                tabIndex={0}
                className={clsx(css.base, className)}
                src={src}
                height={height}
                width={width}
                alt={alt}
                onClick={open}
                onKeyPress={keyboard}
            />
        </>
    );
};

export default FullScreenImg;
