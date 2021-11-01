import React from 'react';

import { useChatListSelector } from '../../../../state/entities/chats/chats.selector';
import ImageWrp from '../../../common/image-wrp/image-wrp';

import css from './chat-banner.module.scss';

const ChatBanner = (): JSX.Element => {
    const chatListState = useChatListSelector();
    const loading = chatListState.status === 'idle' || chatListState.status === 'loading';

    return (
        <div className={css.root}>
            <ImageWrp name="chat" />
            <p>
                {loading
                    ? 'Завантажуэться...'
                    : chatListState.data.length
                    ? 'Оберіть чат в лівій панелі'
                    : 'У немає відкритих чатів! Знайдіть оголошення про оренду квартири на сайті та напишіть перше повідомлення'}
            </p>
        </div>
    );
};

export default ChatBanner;
