import React from 'react';

import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import toastConfig from '../../../../../config/toast.cofig';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { POST_STATUS } from '../../../../../state/entities/posts/posts.interface';
import { deletePostThunk } from '../../../../../state/entities/posts/thunks/delete-post.thunk';
import { personalPostsListThunk } from '../../../../../state/entities/posts/thunks/personal-posts.thunk';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

interface IProps {
    postId: number;
    isSinglePost: boolean;
}

const DeletePost = ({ postId, isSinglePost }: IProps): JSX.Element => {
    const history = useRouter();
    const page = Number(history.query.page) || 1;
    const status = (String(history.query.status) as POST_STATUS) || POST_STATUS.DRAFT;
    const dispatch = useAppDispatch();

    const handleSubmit = async (): Promise<void> => {
        modal.close();
        const deletedPostId = await dispatch(deletePostThunk(postId));
        if (!deletedPostId) return;

        if (!isSinglePost) await dispatch(personalPostsListThunk({ status, page }));
        toast.success('Ви успішно видалили свій пост!', toastConfig);
    };

    return (
        <StickyModal
            title="⛔️ Видалити цей пост?"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary onClick={handleSubmit}>
                        Видалити
                    </Button>
                </>
            }
        >
            <p>Ви впевнені, що хочете видалити цей пост? Після видалення ви більше не зможете його відновити</p>
        </StickyModal>
    );
};

const deletePost = (postId: number, isSinglePost = false): void => {
    modal.open(<DeletePost postId={postId} isSinglePost={isSinglePost} />);
};

export default deletePost;
