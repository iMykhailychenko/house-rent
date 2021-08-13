import React, { ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';

import useTrans from '../../../../../hooks/trans.hook';
import routes from '../../../../../utils/routes';
import ArrowLink from '../../../../common/arrow-link/arrow-link';
import css from './tenant.module.scss';

const Tenant = (): ReactElement => {
    const trans = useTrans();
    return (
        <div className={css.root}>
            <CSSTransition in timeout={1000} appear>
                <img className={css.img} src="/room.png" alt="" />
            </CSSTransition>

            <CSSTransition in timeout={1000} appear>
                <h2 className="title-1">{trans('Досить витрачати свій час на пошук житла! Твоя квартира знайде тебе сама.')}</h2>
            </CSSTransition>

            <CSSTransition in timeout={1000} appear>
                <p className="subtitle-1">
                    {trans(
                        'Набридло годинаму шукати квартиру, знаходити підходящій варінт, а в результаті дізнаватися що вона вже здана? Ми перевернули все з ніг на голову. Тепер ви публікуєте оголошення, а рієлтори та власники пропонують вам житло',
                    )}
                </p>
            </CSSTransition>

            <CSSTransition in timeout={10} appear>
                <ArrowLink className={css.link} href={routes.posts.new}>
                    {trans('Подати оголошення')}
                </ArrowLink>
            </CSSTransition>
        </div>
    );
};

export default Tenant;
