import clsx from 'clsx';
import React, { ReactElement, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Switch from '../../../common/switch/switch';
import Container from '../../../layout/container/container';
import Section from '../../../layout/section/section';
import Owner from './components/owner';
import Tenant from './components/tenant';
import css from './home-banner.module.scss';

const USER_ROLE = [
    { id: 'tenant', name: 'Орендар' },
    { id: 'owner', name: 'Власник / рієлтор' },
];

const HomeBanner = (): ReactElement => {
    const [userRole, setUserRole] = useState(USER_ROLE[0].id);

    const handleChange = (value: boolean): void => {
        setUserRole(value ? 'tenant' : 'owner');
    };

    return (
        <Section className={css.section}>
            <Container size="md">
                <div className={clsx(css.root, css[userRole])}>
                    <div className={css.inner}>
                        <Switch
                            size="lg"
                            width={19}
                            className={css.switch}
                            onChange={handleChange}
                            value={userRole === 'tenant'}
                            labels={['Орендарям', 'Власникам / рієлторам']}
                        />
                        {userRole === 'tenant' ? <Tenant /> : <Owner />}
                    </div>

                    <CSSTransition className={css.img} in={userRole === 'tenant'} timeout={10} appear unmountOnExit>
                        <img src="/tenant.svg" alt="" draggable="false" />
                    </CSSTransition>

                    <CSSTransition className={css.img} in={userRole === 'owner'} timeout={10} appear unmountOnExit>
                        <img src="/owner.svg" alt="" draggable="false" />
                    </CSSTransition>
                </div>
            </Container>
        </Section>
    );
};

export default HomeBanner;
