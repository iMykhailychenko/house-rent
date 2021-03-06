import React from 'react';

import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';

import useAuth from '../../../../../hooks/auth.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { VALIDATE_EMAIL_ERROR } from '../../../../../utils/common-banners';
import routes from '../../../../../utils/routes';
import { banner } from '../../../../common/banner/banner';
import Button from '../../../../common/button/button';
import css from '../home-banner.module.scss';

const Tenant = (): JSX.Element => {
    const trans = useTrans();
    const { token } = useAuth();
    const history = useRouter();
    const profileData = useProfileInfoSelector();

    const handleRedirect = (): void => {
        if (token.accessToken && !profileData.data.isEmailVerified) {
            banner.add(VALIDATE_EMAIL_ERROR);
            return;
        }

        history.push(routes.posts.new);
    };

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
                <Button className={css.button} onClick={handleRedirect} primary>
                    Створити оголошення
                </Button>
            </CSSTransition>
        </div>
    );
};

export default Tenant;
