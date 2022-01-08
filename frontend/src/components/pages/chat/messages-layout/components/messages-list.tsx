import React from 'react';

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { fontSize } from '@mui/system';
import Link from 'next/link';

import useConfig from '../../../../../hooks/config.hook';
import { Message } from '../../../../../state/entities/chats/chats.interface';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { formatTime } from '../../../../../utils/helpers/date.helper';
import routes from '../../../../../utils/routes';
import messageConfigModal from '../../../../common/modal/modals/message-config/message-config';
import Tooltip from '../../../../common/tooltip/tooltip';
import UserAvatar from '../../../../common/user/user-avatar/user-avatar';
import css from '../messages-layout.module.scss';

interface IProps {
    isFirstMessage?: boolean;
    message: Message;
}

const MessagesList = ({ isFirstMessage = false, message }: IProps): JSX.Element => {
    const profileState = useProfileInfoSelector();
    const isAuthor = profileState.data.id === message.author.id;

    const [config] = useConfig();
    const chatFontSize = config.chatFontSize + 'rem';
    const userFontSize = config.chatFontSize + 0.2 + 'rem';
    const dateFontSize = config.chatFontSize - 0.2 + 'rem';

    const renderMessage = (): JSX.Element => (
        <p
            style={{ fontSize: chatFontSize }}
            className={css.text}
            dangerouslySetInnerHTML={{
                __html: message.text?.replace(/</gi, '&#60;')?.replace(/>/gi, '&#62;')?.replace(/\n/gi, '<br/>'),
            }}
        />
    );

    const messageWrp = {
        button: (children: JSX.Element): JSX.Element => (
            <button style={{ fontSize: chatFontSize }} className={css.textWrpIsAuthor} onClick={messageConfigModal(message)}>
                {children}
            </button>
        ),
        div: (children: JSX.Element): JSX.Element => (
            <div style={{ fontSize: chatFontSize }} className={css.textWrp}>
                {children}
            </div>
        ),
    };

    return (
        <>
            {messageWrp[isAuthor ? 'button' : 'div'](
                <>
                    {isAuthor ? (
                        <Tooltip className={css.tooltip} content="Натисніть щоб редагувати">
                            {renderMessage()}
                        </Tooltip>
                    ) : (
                        renderMessage()
                    )}
                    <p className={css.time}>
                        {message.updatedAt && <span>edited</span>}
                        {message.isNew ? <DoneIcon /> : <DoneAllIcon className={css.done} />}
                        <span style={{ fontSize: dateFontSize }}>{formatTime(message.createdAt)}</span>
                    </p>
                </>,
            )}

            {isFirstMessage && (
                <Link href={routes.users.profile(message.author.id)}>
                    <a className={css.flex}>
                        <UserAvatar
                            className={css.avatar}
                            src={message.author.avatar}
                            firstName={message.author.firstName}
                            lastName={message.author.lastName}
                            diameter={3.5 + config.chatFontSize}
                        />
                        <p style={{ fontSize: userFontSize }} className={css.user}>
                            {message.author.firstName} {message.author.lastName}
                        </p>
                    </a>
                </Link>
            )}
        </>
    );
};

export default MessagesList;
