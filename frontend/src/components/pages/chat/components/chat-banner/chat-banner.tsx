import React, { ReactElement } from 'react';

import ImageWrp from '../../../../common/image-wrp/image-wrp';

import css from './chat-banner.module.scss';

const ChatBanner = (): ReactElement => {
    return (
        <div className={css.root}>
            <ImageWrp name="chat" />
            <p>Оберіть чат в лівій панелі</p>
        </div>
    );
};

export default ChatBanner;
