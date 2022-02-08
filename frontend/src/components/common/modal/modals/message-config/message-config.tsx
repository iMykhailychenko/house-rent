import React from 'react';

import clsx from 'clsx';
import { toast } from 'react-toastify';

import toastConfig from '../../../../../config/toast.cofig';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { Message } from '../../../../../state/entities/chats/chats.interface';
import { deleteMessageThunk } from '../../../../../state/entities/chats/thunks/delete-message.thunk';
import { copyText } from '../../../../../utils/helpers/copy-text.helper';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';
import editMessageModal from '../edit-message/edit-message';

import css from './message-config.module.scss';

interface IProps {
    message: Message;
}

const MessageConfig = ({ message }: IProps): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();

    const copyMessage = async (): Promise<void> => {
        modal.close();
        try {
            await copyText(message.text);
            toast.success('Текст успішно скопійовано', toastConfig);
        } catch (e) {
            toast.error('Виникла помилка', toastConfig);
        }
    };

    const deleteMessage = (): void => {
        dispatch(deleteMessageThunk(message.id));
        modal.close();
    };

    return (
        <StickyModal>
            <ul>
                <li className={css.li}>
                    <button type="button" onClick={copyMessage} className={css.btn}>
                        {trans('Копіювати текст')}
                    </button>
                </li>
                <li className={css.li}>
                    <button type="button" onClick={editMessageModal(message)} className={css.btn}>
                        {trans('Редагувати')}
                    </button>
                </li>
                <li className={css.li}>
                    <button type="button" onClick={deleteMessage} className={clsx(css.btn, css.error)}>
                        {trans('Видалити')}
                    </button>
                </li>
            </ul>
        </StickyModal>
    );
};

const messageConfigModal = (message: Message) => (): void => {
    modal.open(<MessageConfig message={message} />);
};

export default messageConfigModal;
