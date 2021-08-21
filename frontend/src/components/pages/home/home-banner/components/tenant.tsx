import React, { ReactElement } from 'react';

import { CSSTransition } from 'react-transition-group';

import useTrans from '../../../../../hooks/trans.hook';
import routes from '../../../../../utils/routes';
import Link from '../../../../common/link/link';
import css from '../home-banner.module.scss';

const Tenant = (): ReactElement => {
    const trans = useTrans();

    return (
        <div className={css.animation}>
            <CSSTransition in timeout={10} appear>
                <h2 className="title-1">{trans('Досить витрачати свій час на пошук житла! Твоя квартира знайде тебе сама.')}</h2>
            </CSSTransition>

            <CSSTransition in timeout={150} appear>
                <p className="text-1">
                    {trans(
                        'Набридло годинаму шукати квартиру, знаходити підходящій варінт, а в результаті дізнаватися що вона вже здана? Ми перевернули все з ніг на голову. Тепер ви публікуєте оголошення, а рієлтори та власники пропонують вам житло',
                    )}
                </p>
            </CSSTransition>

            <CSSTransition in timeout={250} appear>
                <Link className={css.button} href={routes.posts.new} type="button" primary>
                    Створити оголошення
                </Link>
            </CSSTransition>
        </div>
    );
};

export default Tenant;
