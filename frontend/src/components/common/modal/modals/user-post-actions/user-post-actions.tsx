import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { POST_ACTIONS, postActionsMap, postFunctionsMap } from '../../../../../utils/post-functions';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './user-post-actions.module.scss';

interface IProps {
    post: IPost;
}
const UserPostActions = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();
    const history = useRouter();
    const actions = postActionsMap[post.status];
    const functions = postFunctionsMap(history);

    const handleAction = (action: POST_ACTIONS) => async (): Promise<void> => {
        await functions[action](post.id);
    };

    return (
        <StickyModal>
            <ul>
                {actions.map(action => (
                    <li className={css.li} key={action}>
                        <button
                            type="button"
                            onClick={handleAction(action)}
                            className={clsx(css.btn, action === POST_ACTIONS.DELETE && css.error)}
                        >
                            {trans(action)}
                        </button>
                    </li>
                ))}
            </ul>
        </StickyModal>
    );
};

const userPostActions = (post: IPost) => (): void => {
    modal.open(<UserPostActions post={post} />);
};

export default userPostActions;
