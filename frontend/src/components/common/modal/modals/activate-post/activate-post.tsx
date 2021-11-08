import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import toastConfig from '../../../../../config/toast.cofig';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { POST_STATUS } from '../../../../../state/entities/posts/posts.interface';
import { personalPostsListThunk } from '../../../../../state/entities/posts/thunks/personal-posts.thunk';
import { updatePostStatusThunk } from '../../../../../state/entities/posts/thunks/update-status.thunk';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

interface IProps {
    postId: number;
    isSinglePost: boolean;
}

const ActivatePost = ({ postId, isSinglePost }: IProps): JSX.Element => {
    const history = useRouter();
    const page = +String(history.query.page || 1);
    const status = String(history.query.status || POST_STATUS.DRAFT) as POST_STATUS;
    const dispatch = useAppDispatch();

    const handleSubmit = async (): Promise<void> => {
        modal.close();
        const post = await dispatch(updatePostStatusThunk({ id: postId, status: POST_STATUS.ACTIVE })).unwrap();
        if (!post.id) return;

        if (!isSinglePost) await dispatch(personalPostsListThunk({ status, page }));
        toast.success('Ви успішно активували свій пост! Тепер він доступний для інших користувачів на сайті', toastConfig);
    };

    return (
        <StickyModal
            title="Активувати цей пост?"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary onClick={handleSubmit}>
                        Активувати
                    </Button>
                </>
            }
        >
            <p>Ви впевнені, що хочете активувати цей пост? Після активувації він буде доступний усім користувачам сайту</p>
        </StickyModal>
    );
};

const activatePost = (postId: number, isSinglePost = false): void => {
    modal.open(<ActivatePost postId={postId} isSinglePost={isSinglePost} />);
};

export default activatePost;
