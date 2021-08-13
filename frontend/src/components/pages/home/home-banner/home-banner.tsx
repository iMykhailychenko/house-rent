import React, { ReactElement, useState } from 'react';

import useTrans from '../../../../hooks/trans.hook';
import SegmentedControl from '../../../common/segmented-control/segmented-control';
import Container from '../../../layout/container/container';
import Section from '../../../layout/section/section';
import css from './home-banner.module.scss';
import Owner from './owner/owner';
import Tenant from './tenant/tenant';

const USER_ROLE = [
    { id: 'tenant', name: 'Орендар' },
    { id: 'owner', name: 'Власник / рієлтор' },
];

const contentMap: { [key: string]: ReactElement } = {
    tenant: <Tenant />,
    owner: <Owner />,
};

const HomeBanner = (): ReactElement => {
    const trans = useTrans();
    const [userRole, setUserRole] = useState(USER_ROLE[0].id);

    return (
        <Section>
            <Container className={css.root} size="md">
                <h3 className={css.topTitle}>{trans('Хто вы?')}</h3>
                <SegmentedControl className={css.segmented} active={userRole} onChange={setUserRole} value={USER_ROLE} />

                {contentMap[userRole]}
            </Container>
        </Section>
    );
};

export default HomeBanner;
