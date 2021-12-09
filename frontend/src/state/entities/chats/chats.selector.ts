import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { LoadingStatus } from '../../interfaces/common';
import { RootState } from '../../reducer';

import { ChatsList, MessagesList, SingleChat } from './chats.interface';

export const useChatListSelector = (): ChatsList => useAppSelector<ChatsList>(({ chats }: RootState) => chats.list, shallowEqual);

export const useSingleChatSelector = (): SingleChat =>
    useAppSelector<SingleChat>(({ chats }: RootState) => chats.single, shallowEqual);

export const useChatsStatusSelector = (): LoadingStatus =>
    useAppSelector<LoadingStatus>(({ chats }: RootState) => chats.list.status, shallowEqual);

export const useMessageSelector = (): MessagesList =>
    useAppSelector<MessagesList>(({ chats }: RootState) => chats.messages, shallowEqual);

export const useMessageStatusSelector = (): LoadingStatus =>
    useAppSelector<LoadingStatus>(({ chats }: RootState) => chats.messages.status, shallowEqual);
