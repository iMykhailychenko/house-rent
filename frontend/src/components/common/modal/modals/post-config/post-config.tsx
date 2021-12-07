import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { useConfigDataSelector } from '../../../../../state/entities/posts/posts.selector';
import { getIsPostFavoriteThunk, togglePostFavoriteThunk } from '../../../../../state/entities/posts/thunks/post-favorite.thunk';
import TextSkeleton from '../../../skeletons/text-skeleton/text-skeleton';
import SmallModalWrp from '../../components/small-modal-wrp/small-modal-wrp';
import { modal } from '../../modal';
import css from '../profile-nav/profile-nav.module.scss';

interface IProps {
    post: IPost;
}

export const PostConfig = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const postData = useConfigDataSelector();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!postData[post.id]?.id) {
            dispatch(getIsPostFavoriteThunk(post)).then(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [dispatch, post, postData]);

    const toggleFavorite = (): void => {
        dispatch(togglePostFavoriteThunk(post.id));
    };

    return (
        <SmallModalWrp>
            <ul>
                {loading ? (
                    [1, 2, 3, 4, 5].map(item => (
                        <li key={item} className={css.li}>
                            <div className={css.btn}>
                                <TextSkeleton />
                            </div>
                        </li>
                    ))
                ) : (
                    <>
                        <li className={css.li}>
                            <button type="button" className={css.btn} onClick={toggleFavorite}>
                                {postData[post.id].isFavorite ? 'Видалити з обраних' : 'Додати в обрані'}
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </SmallModalWrp>
    );
};

const postConfigModal = (post: IPost): void => {
    modal.open(<PostConfig post={post} />);
};

export default postConfigModal;
