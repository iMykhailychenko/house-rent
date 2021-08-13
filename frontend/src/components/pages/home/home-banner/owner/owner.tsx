import { ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';

import useTrans from '../../../../../hooks/trans.hook';
import routes from '../../../../../utils/routes';
import ArrowLink from '../../../../common/arrow-link/arrow-link';
import css from './owner.module.scss';

const Owner = (): ReactElement => {
    const trans = useTrans();

    return (
        <div className={css.root}>
            <CSSTransition in timeout={1000} appear>
                <img className={css.img} src="/room.png" alt="" />
            </CSSTransition>

            <CSSTransition in timeout={1000} appear>
                <h2 className="title-1">{trans('Набридло публікувати сотні оголошень та місяціми чекати на результат?')}</h2>
            </CSSTransition>

            <CSSTransition in timeout={1000} appear>
                <p className="subtitle-1">
                    {trans(
                        'Ми перевернули все з ніг на голову. Тепер ви пропонуєте своє житло орендарам напряму! Більше ніяких небажаних дзвінків, ви самі обираєте кого заселити',
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

export default Owner;
