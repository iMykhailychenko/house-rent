import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

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

    return (
        <div className={css.root}>
            {file && <img className={css.img} src="" alt="" />}
            <form className={css.form} action="#" method="post">
                <label className={css.label}>
                    <h2 className={css.title}>Upload product images:</h2>
                    <input ref={ref} onChange={change} className={css.input} type="file" accept=".jpg, .jpeg, .png" />
                    <button className={css.btn} onClick={click} type="button">
                        Click to upload
                    </button>
                </label>
            </form>
        </div>
    );
};

export default NewPostImg;
