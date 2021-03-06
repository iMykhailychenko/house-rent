import React from 'react';

import { useRouter } from 'next/router';

import openLangModal from '../../../common/modal/modals/languages/languages';

import css from './header-language.module.scss';

const HeaderLanguage = (): JSX.Element => {
    const history = useRouter();

    return (
        <button type="button" className={css.button} onClick={openLangModal}>
            <img className={css.img} src={`/lang/${history.locale?.toUpperCase()}.svg`} alt="language" />
        </button>
    );
};

export default HeaderLanguage;
