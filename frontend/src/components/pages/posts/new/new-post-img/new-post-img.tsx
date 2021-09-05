import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';

import { DeleteOutline } from '@material-ui/icons';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { mediaThunk, resetUploads } from '../../../../../state/entities/media/media.reducer';
import { useUploadMediaSelector } from '../../../../../state/entities/media/media.selector';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';
import { editPostThunk } from '../../../../../state/entities/posts/posts.thunk';
import routes from '../../../../../utils/routes';
import Button from '../../../../common/button/button';
import Link from '../../../../common/link/link';
import Progress from '../../../../common/progress/progress';

import css from './new-post-img.module.scss';

const NewPostImg = (): ReactElement => {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const history = useRouter();
    const dispatch = useAppDispatch();
    const newPost = useNewPostSelector();
    const uploadState = useUploadMediaSelector();

    const click = (): void => {
        if (ref.current) {
            ref.current.form?.reset();
            ref.current.click();
        }
    };

    const change = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files?.[0]) {
            setFile(event.target.files?.[0]);
        }
    };

    const deleteFile = (): void => setFile(null);

    const upload = async (): Promise<void> => {
        if (file && newPost.data?.id) {
            try {
                const image = await dispatch(mediaThunk(file)).unwrap();
                await dispatch(editPostThunk({ id: newPost.data.id, body: { image: image.url } }));
                history.push(routes.posts.single(newPost.data.id), undefined, { shallow: true });
            } catch (error) {
                console.log(error?.response || error);
            }
        }
    };

    useEffect(() => {
        dispatch(resetUploads());
    }, [dispatch]);

    return (
        <div className={css.root}>
            <h3 className={css.title}>Libero magnam nesciunt nihil perspiciatis porro.</h3>
            <form className={css.form} action="#" method="post">
                <p className={css.text}>{file ? 'Click to change photo' : 'Click to upload photo'}</p>
                {file ? (
                    <img className={css.file} src={window.URL.createObjectURL(file)} alt="" onClick={click} aria-hidden="true" />
                ) : (
                    <div className={css.img} onClick={click} aria-hidden="true">
                        <img src="/icons/upload.png" alt="" draggable="false" />
                    </div>
                )}

                <input ref={ref} onChange={change} className={css.input} type="file" accept=".jpg, .jpeg, .png" />

                {uploadState.status === 'loading' || uploadState.status === 'success' ? (
                    <div className={css.progress}>
                        <Progress number={uploadState.progress} />
                    </div>
                ) : (
                    file && (
                        <div className={css.flex}>
                            <Button className={css.btn} onClick={deleteFile} secondary>
                                <DeleteOutline />
                            </Button>
                        </div>
                    )
                )}

                {newPost.data?.id && (
                    <div className={css.flex}>
                        <Link href={routes.posts.single(newPost.data?.id)} type="button" secondary>
                            Продовжити без фото
                        </Link>
                        <Button primary disabled={!file} onClick={upload}>
                            Далі
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default NewPostImg;
