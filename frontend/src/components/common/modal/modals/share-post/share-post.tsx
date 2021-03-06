import React, { useState } from 'react';

import FileCopy from '@mui/icons-material/FileCopy';
import clsx from 'clsx';

import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { copyText } from '../../../../../utils/helpers/copy-text.helper';
import { cutString } from '../../../../../utils/helpers/string.helper';
import routes from '../../../../../utils/routes';
import Socials from '../../../share-links/share-links';
import Tooltip from '../../../tooltip/tooltip';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './share-post.module.scss';

interface IProps {
    post: IPost;
}

const SharePost = ({ post }: IProps): JSX.Element => {
    const [done, setDone] = useState(false);
    const [error, setError] = useState(false);
    const url = window.location.origin + routes.posts.single(post.id);

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

const sharePost = (post: IPost) => (): void => {
    if (process.browser) {
        modal.open(
            <StickyModal>
                <SharePost post={post} />
            </StickyModal>,
        );
    }
};

export default sharePost;
