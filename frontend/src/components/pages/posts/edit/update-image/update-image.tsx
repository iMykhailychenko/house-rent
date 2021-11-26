import React, { ChangeEvent, useContext, useRef } from 'react';

import DeleteOutline from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import clsx from 'clsx';

import Button from '../../../../common/button/button';
import FullScreenImg from '../../../../common/full-screen-img/full-screen-img';
import Container from '../../../../layout/container/container';

import { UploadContext } from './update-image.context';
import css from './update-image.module.scss';

const UpdateImage = (): JSX.Element => {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useContext(UploadContext);

    const click = (): void => {
        document.body.style.overflow = '';
        if (ref.current) {
            ref.current.form?.reset();
            ref.current.click();
        }
    };

    const change = (event: ChangeEvent<HTMLInputElement>): void => {
        document.body.style.overflow = '';
        if (event.target.files?.[0]) {
            setFile(event.target.files?.[0]);
        }
    };

    const deleteFile = (): void => setFile(null);

    const handleMouseEnter = (): void => {
        document.body.style.overflow = 'hidden';
    };

    const handleMouseLeave = (): void => {
        document.body.style.overflow = '';
    };

    return (
        <Container className={clsx(css.upload, { [css.noFile]: !file })} size={file ? 'md' : 'sm'}>
            {file ? (
                <>
                    <div className={css.banner}>
                        <FullScreenImg className={css.imgTag} src={window.URL.createObjectURL(file)} />
                    </div>
                    <div className={css.flex}>
                        <Button className={css.arrow} onClick={click} secondary>
                            <ReplayIcon />
                        </Button>
                        <Button className={css.btn} onClick={deleteFile} secondary>
                            <DeleteOutline />
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p className={css.text}>{file ? 'Click to change photo' : 'Click to upload photo'}</p>
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={clsx(css.img, file && css.imgUploaded)}
                        onClick={click}
                        aria-hidden="true"
                    >
                        <img src="/icons/upload.png" alt="" draggable="false" />
                    </div>
                </>
            )}
            <input ref={ref} onChange={change} className={css.input} type="file" accept=".jpg, .jpeg, .png" />
        </Container>
    );
};

export default UpdateImage;
