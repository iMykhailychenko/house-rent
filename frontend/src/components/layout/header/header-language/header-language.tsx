import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { LANGUAGE_ENUM } from '../../../../interfaces';

import css from './header-language.module.scss';

const locales: LANGUAGE_ENUM[] = [LANGUAGE_ENUM.UA, LANGUAGE_ENUM.RU];

interface IProps {
    language: LANGUAGE_ENUM;
}

const LanguageButton = ({ language }: IProps): ReactElement => {
    const history = useRouter();

    const handleClick = (): void => {
        history.push(history.pathname, history.asPath, { locale: language || LANGUAGE_ENUM.UA, scroll: false });
    };

    return (
        <button type="button" className={clsx(css.button, history.locale === language && css.active)} onClick={handleClick}>
            {language}
        </button>
    );
};

const HeaderLanguage = (): ReactElement => {
    return (
        <div className={css.root}>
            {locales.map(language => (
                <LanguageButton key={language} language={language} />
            ))}
        </div>
    );
};

export default HeaderLanguage;
