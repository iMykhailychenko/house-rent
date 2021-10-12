import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { ThunkStatuses } from '../../interfaces';
import { RootState } from '../../reducer';

import { ChatsList, MessagesList, SingleChat } from './chats.interface';

export const useChatListSelector = (): ChatsList => useAppSelector<ChatsList>(({ chats }: RootState) => chats.list, shallowEqual);

export const useSingleChatSelector = (): SingleChat =>
    useAppSelector<SingleChat>(({ chats }: RootState) => chats.single, shallowEqual);

export const useMessageSelector = (): MessagesList =>
    useAppSelector<MessagesList>(({ chats }: RootState) => chats.messages, shallowEqual);

export const useMessageStatusSelector = (): ThunkStatuses =>
    useAppSelector<ThunkStatuses>(({ chats }: RootState) => chats.messages.status, shallowEqual);
