import React from 'react';

import ReactDOM from 'react-dom';

import css from './header-notification.module.scss';

interface IProps {
    onClose: () => void;
}
const HeaderNotification = ({ onClose }: IProps): JSX.Element => {
    return ReactDOM.createPortal(
        <>
            <div className={css.backdrop} onClick={onClose} aria-hidden="true" />
            <div className={css.root}>
                <div className={css.inner}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae
                    nobis odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
                </div>
            </div>
        </>,
        document.body,
    );
};

export default HeaderNotification;
