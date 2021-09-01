import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

import { DeleteOutline } from '@material-ui/icons';

import Button from '../../../../common/button/button';
import Progress from '../../../../common/progress/progress';

import css from './new-post-img.module.scss';

const NewPostImg = (): ReactElement => {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

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

    const deleteFile = (): void => {
        setFile(null);
    };

    return (
        <div className={css.root}>
            <h3 className={css.title}>
                Libero magnam nesciunt nihil perspiciatis porro quis repellendus sunt tempora vitae voluptatem voluptatibus.
            </h3>
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

                <div className={css.progress}>
                    <Progress number={10} />
                </div>

                {file && (
                    <div className={css.flex}>
                        <Button className={css.btn} onClick={deleteFile} secondary>
                            <DeleteOutline />
                        </Button>
                    </div>
                )}

                <div className={css.flex}>
                    <Button secondary>Публікувати без фото</Button>
                    <Button primary disabled={!file}>
                        Далі
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewPostImg;
