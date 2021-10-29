import React, { ChangeEvent, useState } from 'react';

import { useChatSocket } from '../../../../../hooks/chat.hook';
import Button from '../../../button/button';
import Textarea from '../../../textarea/textarea';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './edit-message-modal.module.scss';

interface IProps {
    message: string;
}

const EditMessageModal = ({ message }: IProps): JSX.Element => {
    const socket = useChatSocket();
    const [text, setText] = useState<string>(message);
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setText(event.target.value);

    return (
        <StickyModal
            title="Редагувати повідомлення"
            footer={
                <>
                    <Button className={css.btn} secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button className={css.btn} primary>
                        Змінити
                    </Button>
                </>
            }
        >
            <>
                <p>Ваше повідомлення</p>
                <Textarea
                    className={css.input}
                    value={text}
                    onChange={handleChange}
                    error={!text.trim() ? 'Повідомлення не може бути порожнім' : false}
                />
            </>
        </StickyModal>
    );
};

const editMessageModal = (message: string) => (): void => {
    modal.open(<EditMessageModal message={message} />);
};

export default editMessageModal;
