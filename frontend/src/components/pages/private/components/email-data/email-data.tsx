import React from 'react';

import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';

import useTrans from '../../../../../hooks/trans.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import changeEmailModal from '../../../../common/modal/modals/change-email/change-email';
import Cell from '../common/cell';
import Row from '../common/row';
import Section from '../common/section';

import css from './email-data.module.scss';

const EmailData = (): JSX.Element => {
    const trans = useTrans();
    const profileState = useProfileInfoSelector().data;

    return (
        <Section title={trans('Контакти')} icon={<AttachEmailOutlinedIcon />} onClick={changeEmailModal}>
            <Row>
                <>
                    <Cell>
                        <h5>Електронна пошта</h5>
                        <p>{profileState.email}</p>
                    </Cell>
                    {!profileState.isEmailVerified && (
                        <div className={css.warn}>
                            <WarningOutlinedIcon />
                            <div className={css.inner}>
                                <small>
                                    Увага! Ви не веріфікували вашу пошту. Для верифікації потрібно перейти за посилання в листі,
                                    що ми надіслали на вашу пошту.
                                </small>
                                <button type="button" className={css.link}>
                                    Надіслати лист повторно
                                </button>
                            </div>
                        </div>
                    )}
                </>
            </Row>
        </Section>
    );
};

export default EmailData;
