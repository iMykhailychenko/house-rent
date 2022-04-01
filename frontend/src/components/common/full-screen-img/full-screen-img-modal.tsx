import React, { useEffect, useRef } from 'react';

import Close from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';

import { cutString } from '../../../utils/helpers/string.helper';

import css from './full-screen-img.module.scss';

interface IProps {
    src: string;
    alt?: string;
    onClick: () => void;
}

const FullScreenImgModal = ({ src, onClick, alt }: IProps): JSX.Element => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    useEffect(() => {
        const handler = (event: KeyboardEvent): void => {
            if (event.key === 'Escape' || event.code === 'Enter') onClick();
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClick]);

    return ReactDOM.createPortal(
        <div className={css.open}>
            <button ref={ref} className={css.close} type="button">
                <Close />
            </button>
            <img src={src} alt={alt ? cutString(alt, 80) : ''} onClick={onClick} aria-hidden="true" />
        </div>,
        document.body,
    );
};

export default FullScreenImgModal;
