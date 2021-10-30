import React, { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../../hooks/chat.hook';
import { Message } from '../../../../../state/entities/chats/chats.interface';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import Button from '../../../button/button';
import Textarea from '../../../textarea/textarea';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './edit-message-modal.module.scss';

interface IProps {
    message: Message;
}

const EditMessageModal = ({ message }: IProps): JSX.Element => {
    const socket = useChatSocket();
    const profile = useProfileInfoSelector();

    const router = useRouter();
    const chatId = +String(router.query.chatId);

    const [text, setText] = useState<string>(message.text);
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setText(event.target.value);

    const handleSubmit = (): void => {
        if (message.text.trim() !== text.trim()) {
            socket?.update({
                chatId,
                id: message.id,
                message: text,
                uploads: [],
                userId: profile.data.id,
            });
        }

        modal.close();
    };

    return (
        <StickyModal
            title="Редагувати повідомлення"
            footer={
                <>
                    <Button className={css.btn} secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button className={css.btn} primary onClick={handleSubmit}>
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

const editMessageModal = (message: Message) => (): void => {
    modal.open(<EditMessageModal message={message} />);
};

export default editMessageModal;
