import React, { ReactElement, useState } from 'react';

import FileCopy from '@mui/icons-material/FileCopy';
import clsx from 'clsx';

import { IPost } from '../../../../../../state/entities/posts/posts.interface';
import { copyText, cutString } from '../../../../../../utils/helpers';
import routes from '../../../../../../utils/routes';
import Socials from '../../../../share-links/share-links';
import Tooltip from '../../../../tooltip/tooltip';

import css from './share-post-modal.module.scss';

interface IProps {
    post: IPost;
}

const SharePostModal = ({ post }: IProps): ReactElement => {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const url = process.env.NEXT_PUBLIC_URL + routes.posts.single(post.id);

    const copy = async (): Promise<void> => {
        try {
            await copyText(url);
            setDone(true);
            setTimeout(() => {
                setDone(false);
            }, 1500);
        } catch (e) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1500);
        }
    };

    return (
        <>
            <h2 className={css.postTitle}>{post.title}</h2>
            <p className={css.postText}>{cutString(post.description, 180)}</p>
            {post.image && <img className={css.postImg} src={post.image} alt="" />}

            <Tooltip content="Натисніть щоб скопійовано посилання">
                <button className={clsx(css.link, done && css.done, error && css.error)} type="button" onClick={copy}>
                    <p>{error ? 'Виникла помилка' : done ? 'Посиляння скопійовано' : url}</p>
                    <FileCopy />
                </button>
            </Tooltip>

            <div className={css.socials}>
                <Socials title={post.title} />
            </div>
        </>
    );
};

export default SharePostModal;
