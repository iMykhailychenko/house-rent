import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import clsx from 'clsx';

import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { mediaThunk, resetUploads } from '../../../../../../state/entities/media/media.reducer';
import { useUploadMediaSelector } from '../../../../../../state/entities/media/media.selector';
import { FORM_TYPE, INewPostPayload } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import { useNewPostSelector } from '../../../../../../state/entities/posts/posts.selector';
import { newPostThunk } from '../../../../../../state/entities/posts/thunks/new-post.thunk';
import Button from '../../../../../common/button/button';
import Progress from '../../../../../common/progress/progress';
import css from '../new-post-form.module.scss';

interface IProps {
    value: INewPostPayload;
}

const IMAGE_EXTENSION = '.apng, .avif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .gif, .png, .webp';

const FormTypeFour = ({ value }: IProps): JSX.Element => {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const dispatch = useAppDispatch();
    const newPostState = useNewPostSelector();
    const uploadState = useUploadMediaSelector();
    const loading = newPostState.status === 'loading' || uploadState.status === 'loading';

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

    const goBack = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(updateFormType(FORM_TYPE.THREE));
    };

    const uploadWithoutPhoto = async (): Promise<void> => {
        try {
            const data = await dispatch(newPostThunk(value)).unwrap();
            if (!data?.id) throw new Error();
            dispatch(updateFormType(FORM_TYPE.DONE));
        } catch (error) {
            console.log((error as { response?: string })?.response || error);
        }
    };

    const uploadWithPhoto = async (): Promise<void> => {
        if (file) {
            try {
                const image = await dispatch(mediaThunk(file)).unwrap();
                const data = await dispatch(newPostThunk({ ...value, image: image.url })).unwrap();
                if (!data?.id) throw new Error();
                dispatch(updateFormType(FORM_TYPE.DONE));
            } catch (error) {
                console.log((error as { response?: string })?.response || error);
            }
        }
    };

    useEffect(() => {
        dispatch(resetUploads());
    }, [dispatch]);

    return (
        <div className={css.upload}>
            <h3 className={css.title}>Libero magnam nesciunt nihil perspiciatis porro.</h3>
            <form className={css.inner} action="#" method="post">
                <p className={css.text}>{file ? 'Click to change photo' : 'Click to upload photo'}</p>
                <div className={clsx(css.img, file && css.imgUploaded)} onClick={click} aria-hidden="true">
                    {file ? (
                        <img src={window.URL.createObjectURL(file)} alt="" aria-hidden="true" />
                    ) : (
                        <img src="/icons/upload.png" alt="" draggable="false" />
                    )}
                </div>

                <input ref={ref} onChange={change} className={css.input} type="file" accept={IMAGE_EXTENSION} />

                {uploadState.status === 'loading' || uploadState.status === 'success' ? (
                    <div className={css.progress}>
                        <Progress number={uploadState.progress} />
                    </div>
                ) : (
                    file && (
                        <div className={css.flex}>
                            <Button className={css.arrow} onClick={goBack} secondary>
                                <ArrowBack />
                            </Button>
                            <Button className={css.btn} onClick={deleteFile} secondary>
                                <DeleteOutline />
                            </Button>
                        </div>
                    )
                )}

                <div className={css.flex}>
                    {!file && (
                        <Button className={css.arrow} onClick={goBack} secondary loading={loading}>
                            <ArrowBack />
                        </Button>
                    )}
                    <Button type="button" secondary onClick={uploadWithoutPhoto} loading={loading}>
                        Без фото
                    </Button>
                    <Button primary disabled={!file} onClick={uploadWithPhoto} loading={loading}>
                        Далі
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormTypeFour;
