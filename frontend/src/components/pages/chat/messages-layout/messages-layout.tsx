import React, { Fragment, ReactElement } from 'react';

import { useMessageSelector } from '../../../../state/entities/chats/chats.selector';
import { validateDate } from '../../../../utils/helpers';

import DateSeparator from './components/date-separator';
import MessagesList from './components/messages-list';

const MessagesLayout = (): ReactElement => {
    const messages = useMessageSelector();

    return (
        <>
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
        </>
    );
};

export default MessagesLayout;
