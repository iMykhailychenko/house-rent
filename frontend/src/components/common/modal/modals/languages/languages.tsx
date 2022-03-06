import React from 'react';

import { useRouter } from 'next/router';

import { LANGUAGE_ENUM } from '../../../../../interfaces';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './languages.module.scss';

const locales = [LANGUAGE_ENUM.UK, LANGUAGE_ENUM.EN];

const languageMap = {
    [LANGUAGE_ENUM.UK]: 'Українська (UA)',
    [LANGUAGE_ENUM.EN]: 'English (EN)',
};

export const Languages = (): JSX.Element => {
    const history = useRouter();

    return (
        <ul>
            {locales.map(lang => {
                const handleChangeLang = (): void => {
                    history
                        .push(history.pathname, history.asPath, { locale: lang || LANGUAGE_ENUM.UK, scroll: false })
                        .then(modal.close);
                };

                return (
                    <li className={css.li} key={lang}>
                        <button className={css.btn} type="button" onClick={handleChangeLang}>
                            <span>{languageMap[lang]}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

const openLangModal = (): void => {
    modal.open(
        <StickyModal title="Оберіть мову">
            <Languages />
        </StickyModal>,
    );
};

export default openLangModal;
