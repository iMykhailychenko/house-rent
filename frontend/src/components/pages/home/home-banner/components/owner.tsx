import React, { ReactElement } from 'react';

import { CSSTransition } from 'react-transition-group';

import useTrans from '../../../../../hooks/trans.hook';
import Button from '../../../../common/button/button';
import css from '../home-banner.module.scss';

const Owner = (): ReactElement => {
    const trans = useTrans();

    const handleClick = (): void => {
        window.scrollTo({ top: document.getElementById('home-posts')?.offsetTop, behavior: 'smooth' });
    };

    return (
        <div className={css.animation}>
            <CSSTransition in timeout={100} appear>
                <h2 className="title-1">{trans('Набридло публікувати сотні оголошень та місяціми чекати на результат?')}</h2>
            </CSSTransition>

            <CSSTransition in timeout={150} appear>
                <p className="text-1">
                    {trans(
                        'Ми перевернули все з ніг на голову. Тепер ви пропонуєте своє житло орендарам напряму! Більше ніяких небажаних дзвінків, ви самі обираєте кого заселити',
                    )}
                </p>
            </CSSTransition>

            <CSSTransition in timeout={250} appear>
                <Button className={css.button} onClick={handleClick} primary>
                    Дивитись оголошення
                </Button>
            </CSSTransition>
        </div>
    );
};

export default Owner;
