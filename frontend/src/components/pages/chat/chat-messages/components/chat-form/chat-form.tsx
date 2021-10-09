import React, { ChangeEvent, ReactElement, useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import Textarea from '../../../../../common/textarea/textarea';

import css from './chat-form.module.scss';

const ChatForm = (): ReactElement => {
    const [value, setValue] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setValue(event.target.value);

    return (
        <div className={css.root}>
            <Textarea
                value={value}
                className={css.input}
                onChange={handleChange}
                rootClassName={css.inputWrp}
                placeholder="Напишіть повідомлення"
            />
            <button className={css.file} type="button">
                <AttachFileIcon />
            </button>
            <button className={css.send} type="button">
                <SendIcon />
            </button>
        </div>
    );
};

export default ChatForm;
