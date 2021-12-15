import React, { Fragment } from 'react';

import { useRouter } from 'next/router';

import uiConfig from '../../../../config/ui.config';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { useMessageSelector } from '../../../../state/entities/chats/chats.selector';
import { messagesListPaginationThunk, messagesListThunk } from '../../../../state/entities/chats/chats.thunk';
import { validateDate } from '../../../../utils/helpers/date.helper';
import Button from '../../../common/button/button';

import DateSeparator from './components/date-separator';
import MessagesList from './components/messages-list';
import css from './messages-layout.module.scss';

const MessagesLayout = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const messages = useMessageSelector();

    const history = useRouter();
    const chatId = +String(history.query.chatId);

    const loadMore = (): void => {
        if (
            uiConfig.messagesPerPage > messages.data.length ||
            messages.data.length > uiConfig.messagesPerPage * messages.currentPage
        ) {
            dispatch(messagesListThunk({ page: 1, chatId }));
        } else {
            dispatch(messagesListPaginationThunk({ page: messages.currentPage + 1, chatId }));
        }
    };

    return (
        <>
            <Button secondary className={css.rating}>
                Оцініть чат з користувачем
            </Button>

            {messages.data?.map((message, index, array) => {
                const prevDay = validateDate(array[index + 1]?.createdAt);
                const currentDay = validateDate(message.createdAt);

                const isNextDay = prevDay.getDate() !== currentDay.getDate();

                return (
                    <Fragment key={message.id}>
                        <MessagesList
                            message={message}
                            isFirstMessage={message.author.id !== array[index + 1]?.author.id || isNextDay}
                        />
                        {isNextDay && <DateSeparator date={array[index + 1]?.createdAt ? prevDay : currentDay} />}
                    </Fragment>
                );
            })}

            {!!messages.totalPages && messages.currentPage !== messages.totalPages && (
                <button onClick={loadMore} className={css.more} type="button">
                    Завантажити більше
                </button>
            )}
        </>
    );
};

export default MessagesLayout;
