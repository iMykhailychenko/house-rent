import React, { useEffect, useRef, useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import css from './scroll-top.module.scss';

export const ScrollTop = (): JSX.Element => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [top, setTop] = useState(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setTop(window.scrollY >= 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <CSSTransition in={top} timeout={300} unmountOnExit>
            <button className={css.btn} ref={buttonRef} onClick={handleClick} type="button" />
        </CSSTransition>
    );
};
