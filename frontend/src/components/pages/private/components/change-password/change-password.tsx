import React from 'react';

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import Cell from '../common/cell';
import Row from '../common/row';
import Section from '../common/section';

const ChangePassword = (): JSX.Element => {
    return (
        <Section title="Налаштування приватності" icon={<LockOpenOutlinedIcon />}>
            <Row>
                <Cell>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae
                    nobis odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
                </Cell>
                <Cell>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae
                    nobis odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
                </Cell>
            </Row>
        </Section>
    );
};

export default ChangePassword;
