import React, { ReactElement } from 'react';

import css from './form-image.module.scss';

const FormImage = (): ReactElement => (
    <div className={css.img}>
        <div className={css.inner}>
            <img src="/icons/form.png" alt="" draggable="false" />
        </div>
    </div>
);

export default FormImage;
