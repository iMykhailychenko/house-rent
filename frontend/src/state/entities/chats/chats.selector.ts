import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { LoadingStatus } from '../../interfaces/common';
import { RootState } from '../../reducer';

import { ChatsList, ISingleChatInfo, MessagesList } from './chats.interface';

export const useChatListSelector = (): ChatsList => useAppSelector<ChatsList>(({ chats }: RootState) => chats.list, shallowEqual);

export const useMessageSelector = (): MessagesList =>
    useAppSelector<MessagesList>(({ chats }: RootState) => chats.messages, shallowEqual);

export const useMessageStatusSelector = (): LoadingStatus =>
    useAppSelector<LoadingStatus>(({ chats }: RootState) => chats.messages.status, shallowEqual);

export const useMessageCountSelector = (): number => useAppSelector<number>(({ chats }: RootState) => chats.count, shallowEqual);

export const useSingleChatInfoSelector = (): ISingleChatInfo =>
    useAppSelector<ISingleChatInfo>(({ chats }: RootState) => chats.single.data, shallowEqual);
