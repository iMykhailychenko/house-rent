import React from 'react';

import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { useRole } from '../../../../../hooks/role.hook';
import { POST_STATUS } from '../../../../../state/entities/posts/posts.interface';
import { personalPostsListThunk } from '../../../../../state/entities/posts/thunks/personal-posts.thunk';
import { updatePostStatusThunk } from '../../../../../state/entities/posts/thunks/update-status.thunk';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';
import changeUserRole from '../change-user-role/change-user-role';

import css from './activate-post.module.scss';

interface IProps {
    postId: number;
    isSinglePost: boolean;
}

const ActivatePost = ({ postId, isSinglePost }: IProps): JSX.Element => {
    const history = useRouter();
    const userRole = useRole();
    const page = +String(history.query.page || 1);
    const status = String(history.query.status || POST_STATUS.DRAFT) as POST_STATUS;
    const dispatch = useAppDispatch();

    const handleSubmit = async (): Promise<void> => {
        if (!userRole.isUser) return;
        await dispatch(updatePostStatusThunk({ id: postId, status: POST_STATUS.ACTIVE }));
        if (!isSinglePost) await dispatch(personalPostsListThunk({ status, page }));
        modal.close();
    };

    return (
        <StickyModal
            title="Активувати цей пост?"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary onClick={handleSubmit} disabled={!userRole.isUser}>
                        Активувати
                    </Button>
                </>
            }
        >
            {userRole.isUser ? (
                <p>Ви впевнені, що хочете активувати цей пост? Після активувації він буде доступний усім користувачам сайту</p>
            ) : (
                <p className={css.warn}>
                    Щоб змінити статус оголошення на активне вам потрібно активувати на сайті роль &quot;Користувача&quot;.{' '}
                    <button type="button" className={css.link} onClick={() => changeUserRole('Змінити роль на сайті?')}>
                        Змінити роль?
                    </button>
                </p>
            )}
        </StickyModal>
    );
};

const activatePost = (postId: number, isSinglePost = false): void => {
    modal.open(<ActivatePost postId={postId} isSinglePost={isSinglePost} />);
};

export default activatePost;
