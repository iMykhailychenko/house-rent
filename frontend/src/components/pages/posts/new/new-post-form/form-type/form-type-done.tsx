import React from 'react';

import clsx from 'clsx';
import dynamic from 'next/dynamic';

import { useNewPostSelector } from '../../../../../../state/entities/posts/posts.selector';
import routes from '../../../../../../utils/routes';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import Link from '../../../../../common/link/link';
import css from '../new-post-form.module.scss';

const ConfettiWrp = dynamic(() => import('../../../../../common/confetti/confetti'), { ssr: false });

const FormTypeDone = (): JSX.Element => {
    const newPostState = useNewPostSelector();

    return (
        <>
            <ConfettiWrp />
            <div className={css.done}>
                <ImageWrp name="victory" />
                <p className={css.text}>
                    <span className={css.line}>
                        <strong>Ваше повідомлення успішно створено!</strong>
                    </span>
                    <span className={css.line}>
                        На данний момент воно <strong>не опубліковане</strong> на сайті тому інші користувачі його зможуть знайти.
                        Ми зробили це для того, щоб ви могли його проглянути ще раз та внести зміни за необхідності.
                    </span>
                    <span className={css.line}>
                        Зробити оголошення активним на сайті ви можете безпосередньо на сторінці цього оголошення або у особистому
                        кабінеті
                    </span>
                </p>
                <div className={clsx(css.flex, css.mb)}>
                    <Link href={routes.home} primary>
                        Проглянути всі ваші оголошення
                    </Link>
                </div>
                <div className={css.flex}>
                    <Link type="button" href={routes.home} secondary>
                        Повенутись на головну
                    </Link>
                    <Link
                        type="button"
                        loading={!newPostState.data?.id}
                        href={routes.posts.single(newPostState.data?.id || 0)}
                        primary
                    >
                        Переглянути нове оголошення
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FormTypeDone;
