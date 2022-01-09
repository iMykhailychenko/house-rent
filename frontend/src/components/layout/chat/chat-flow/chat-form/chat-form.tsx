import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../../hooks/chat.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { chunkSubstr } from '../../../../../utils/helpers/string.helper';
import chatActions from '../../../../common/modal/modals/chat-actions/chat-actions';
import Textarea from '../../../../common/textarea/textarea';
import Tooltip from '../../../../common/tooltip/tooltip';

import css from './chat-form.module.scss';

const ChatForm = (): JSX.Element => {
    const history = useRouter();
    const chatId = Number(history.query.chatId);

    const socket = useChatSocket();
    const profileState = useProfileInfoSelector();
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setValue(event.target.value);
    const submit = (): void => {
        if (!value.length) {
            return;
        }

        if (value.length < 500) {
            socket?.send({
                chatId,
                uploads: [],
                message: value,
                author: profileState.data.id,
            });
        } else {
            const messagesArray = chunkSubstr(value, 1500);

            messagesArray.forEach((msg, index) => {
                setTimeout(() => {
                    socket?.send({
                        chatId,
                        uploads: [],
                        message: msg,
                        author: profileState.data.id,
                    });
                }, index * 50);
            });
        }

        setValue('');
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === 'Enter' && !event.shiftKey) {
            if (window.innerWidth < 768) return;

            event.preventDefault();
            submit();
        }
    };

    return (
        <div className={css.root}>
            <Textarea
                value={value}
                className={css.input}
                onChange={handleChange}
                rootClassName={css.inputWrp}
                onKeyDown={handleKeyPress}
                placeholder="Напишіть повідомлення"
            />
            <div className={css.inner}>
                <p className={css.text}>
                    Чтобы отправить сообщение нажмите &quot;Enter&quot;. Для переноса строки нажмите &quot;Enter + Shift&quot;
                </p>
                <div className={css.flex}>
                    <Tooltip content="Налаштування розміру тексту">
                        <button className={css.btn} type="button" onClick={chatActions}>
                            <MoreVertIcon />
                        </button>
                    </Tooltip>

                    <Tooltip content="Надіслати повідомлення">
                        <button className={css.btn} type="button" onClick={submit}>
                            <SendIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default ChatForm;
