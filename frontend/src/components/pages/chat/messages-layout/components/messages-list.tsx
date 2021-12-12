import React from 'react';

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import clsx from 'clsx';
import Link from 'next/link';

import { Message } from '../../../../../state/entities/chats/chats.interface';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { formatTime } from '../../../../../utils/helpers/date.helper';
import routes from '../../../../../utils/routes';
import editMessageModal from '../../../../common/modal/modals/edit-message-modal/edit-message-modal';
import UserAvatar from '../../../../common/user/user-avatar/user-avatar';
import css from '../messages-layout.module.scss';

interface IProps {
    isFirstMessage?: boolean;
    message: Message;
}
const MessagesList = ({ isFirstMessage = false, message }: IProps): JSX.Element => {
    const profileState = useProfileInfoSelector();

    return (
        <>
            <div className={clsx(css.textWrp, { [css.noHover]: profileState.data.id !== message.author.id })}>
                {profileState.data.id === message.author.id ? (
                    <button
                        className={css.text}
                        onClick={editMessageModal(message)}
                        dangerouslySetInnerHTML={{ __html: message.text?.replace(/\n/gi, '<br/>') }}
                    />
                ) : (
                    <p className={css.text} dangerouslySetInnerHTML={{ __html: message.text?.replace(/\n/gi, '<br/>') }} />
                )}

                <p className={css.time}>
                    {message.updatedAt && <span>edited</span>}
                    {message.isNew ? <DoneIcon /> : <DoneAllIcon className={css.done} />}
                    <span>{formatTime(message.createdAt)}</span>
                </p>
            </div>
            {isFirstMessage && (
                <Link href={routes.users.profile(message.author.id)}>
                    <a className={css.flex}>
                        <UserAvatar
                            className={css.avatar}
                            src={message.author.avatar}
                            firstName={message.author.firstName}
                            lastName={message.author.lastName}
                            diameter={3.5}
                        />
                        <p className={css.user}>
                            {message.author.firstName} {message.author.lastName}
                        </p>
                    </a>
                </Link>
            )}
        </>
    );
};

export default MessagesList;
