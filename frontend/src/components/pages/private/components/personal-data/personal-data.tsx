import React from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import useTrans from '../../../../../hooks/trans.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { formatDate } from '../../../../../utils/helpers/date.helper';
import changeUserData from '../../../../common/modal/modals/change-user-data/change-user-data';
import Cell from '../common/cell';
import Row from '../common/row';
import Section from '../common/section';

const PersonalData = (): JSX.Element => {
    const trans = useTrans();
    const profileState = useProfileInfoSelector().data;

    return (
        <Section title="Личные данные" icon={<AccountCircleOutlinedIcon />} onClick={changeUserData}>
            <Row>
                <Cell>
                    <h5>Имя</h5>
                    <p>{profileState.firstName}</p>
                </Cell>
                <Cell>
                    <h5>Фамилия</h5>
                    <p>{profileState.lastName}</p>
                </Cell>
                <Cell>
                    <h5>Дата регистрации</h5>
                    <p>{formatDate(profileState.createdAt, trans)}</p>
                </Cell>
            </Row>
        </Section>
    );
};

export default PersonalData;
