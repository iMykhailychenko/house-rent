import RcScrollParallax from 'rc-scroll-anim/lib/ScrollParallax';
import React, { ReactElement } from 'react';

import useTrans from '../../../../hooks/trans.hook';
import routes from '../../../../utils/routes';
import ArrowLink from '../../../common/arrow-link/arrow-link';
import Container from '../../../layout/container/container';
import Section from '../../../layout/section/section';
import css from './home-banner.module.scss';

const HomeBanner = (): ReactElement => {
    const trans = useTrans();

    return (
        <Section>
            <Container className={css.root} size="md">
                <img className={css.img} src="/room.png" alt="" />
                <RcScrollParallax animation={{ y: 0, opacity: 1 }} style={{ transform: 'translateY(30%)', opacity: 0 }}>
                    <h2 className="title-1">{trans('Досить платити ріелторам просто так! Змусь їх працювати на себе.')}</h2>
                </RcScrollParallax>
                <RcScrollParallax animation={{ y: 0, opacity: 1 }} style={{ transform: 'translateY(30%)', opacity: 0 }}>
                    <p className="subtitle-1">
                        {trans(
                            'Набридло годинаму шукати квартиру, знаходити підходящій варінт, а в результаті дізнаватися що ця квартира вже здана? Ми перевернули все з ніг на голову. Тепер ви публікуєте оголошення, а рієлтори та власники пропонують вам житло',
                        )}
                    </p>
                </RcScrollParallax>
                <RcScrollParallax
                    className={css.add}
                    animation={{ y: 0, opacity: 1 }}
                    style={{ transform: 'translateY(30%)', opacity: 0 }}
                >
                    <ArrowLink className={css.link} href={routes.posts.new}>
                        {trans('Подати оголошення')}
                    </ArrowLink>
                </RcScrollParallax>
            </Container>
        </Section>
    );
};

export default HomeBanner;
