import React, { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../../hooks/chat.hook';
import useMaxWidth from '../../../../../hooks/media.hook';
import { SocketMessagesPayload } from '../../../../../state/entities/chats/chats.interface';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import Textarea from '../../../../common/textarea/textarea';
import Tooltip from '../../../../common/tooltip/tooltip';

import css from './chat-form.module.scss';

const ChatForm = (): ReactElement => {
    const history = useRouter();
    const chatId = +String(history.query.chatId);

    const mobile = useMaxWidth(768);
    const socket = useChatSocket();
    const profileState = useProfileInfoSelector();
    const [value, setValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setValue(event.target.value);
    const submit = (): void => {
        const message: SocketMessagesPayload = {
            chatId,
            uploads: [],
            message: value,
            author: profileState.data.id,
        };
        socket?.emit('msgToServer', message);
        setValue('');
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === 'Enter' && !event.shiftKey) {
            if (!mobile) return;

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
                <p>Чтобы отправить сообщение нажмите &quot;Enter&quot;. Для переноса строки нажмите &quot;Enter + Shift&quot;</p>
                <div className={css.flex}>
                    <Tooltip content="Додати зображення">
                        <button className={css.file} type="button">
                            <AttachFileIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Надіслати повідомлення">
                        <button className={css.send} type="button" onClick={submit}>
                            <SendIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default ChatForm;
