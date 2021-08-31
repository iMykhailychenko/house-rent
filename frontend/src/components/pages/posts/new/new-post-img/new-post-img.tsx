import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

import { DeleteOutline, Sync } from '@material-ui/icons';

import Button from '../../../../common/button/button';

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
            <form className={css.form} action="#" method="post">
                {file ? (
                    <img className={css.file} src={window.URL.createObjectURL(file)} alt="" />
                ) : (
                    <div className={css.img}>
                        <img src="/icons/upload.png" alt="" draggable="false" />
                    </div>
                )}

                <input ref={ref} onChange={change} className={css.input} type="file" accept=".jpg, .jpeg, .png" />

                <div className={css.flex}>
                    {file && (
                        <Button className={css.btn} onClick={deleteFile} secondary>
                            <DeleteOutline />
                        </Button>
                    )}
                    <Button className={css.btn} onClick={click} secondary>
                        <Sync />
                        <span>{file ? 'Click here to change photo' : 'Click here to upload photo'}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default NewPostImg;
