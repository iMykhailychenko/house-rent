import React, { ChangeEvent, ReactElement, useState } from 'react';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import clsx from 'clsx';

import Textarea from '../../../../common/textarea/textarea';
import Tooltip from '../../../../common/tooltip/tooltip';

import css from './chat-form.module.scss';

interface IProps {
    disabled?: boolean;
}

const ChatForm = ({ disabled }: IProps): ReactElement => {
    const [value, setValue] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        !disabled && setValue(event.target.value);
    };

    return (
        <div className={clsx(css.root, disabled && css.disabled)}>
            <Textarea
                value={value}
                className={css.input}
                onChange={handleChange}
                rootClassName={css.inputWrp}
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
                        <button className={css.send} type="button">
                            <SendIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default ChatForm;
