import React, { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { Message } from '../../../../../state/entities/chats/chats.interface';
import { updateMessageThunk } from '../../../../../state/entities/chats/thunks/update-message.thunk';
import Button from '../../../button/button';
import Textarea from '../../../textarea/textarea';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './edit-message.module.scss';

interface IProps {
    message: Message;
}

const EditMessage = ({ message }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const chatId = Number(router.query.chatId);
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState<string>(message.text);
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => setText(event.target.value);

    const handleSubmit = async (): Promise<void> => {
        if (message.text.trim() !== text.trim()) {
            setLoading(true);
            await dispatch(
                updateMessageThunk({
                    chatId,
                    id: message.id,
                    message: text,
                    uploads: [],
                }),
            );
        }

        modal.close();
    };

    return (
        <StickyModal
            title="Редагувати повідомлення"
            footer={
                <>
                    <Button loading={loading} secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button loading={loading} primary onClick={handleSubmit}>
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
    modal.open(<EditMessage message={message} />);
};

export default editMessageModal;
