import React, { ReactElement } from 'react';

import ChatItemSkeleton from '../../../common/skeletons/chat/chat-item/chat-item';

const ChatList = (): ReactElement => {
    return <ChatItemSkeleton amount={12} />;
};

export default ChatList;
