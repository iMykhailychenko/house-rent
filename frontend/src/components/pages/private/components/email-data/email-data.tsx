import React, { useState } from 'react';

import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { sendNewEmailThunk } from '../../../../../state/entities/profile/profile.thunk';
import changeEmailModal from '../../../../common/modal/modals/change-email/change-email';
import Cell from '../common/cell';
import Row from '../common/row';
import Section from '../common/section';

import css from './email-data.module.scss';

const EmailData = (): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const profileState = useProfileInfoSelector().data;

    const [loading, setLoading] = useState(false);

    const handleEmail = async (): Promise<void> => {
        try {
            setLoading(true);
            await dispatch(sendNewEmailThunk());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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
                            {loading ? <img className={css.spinner} src="/spinner.gif" alt="" /> : <WarningOutlinedIcon />}
                            <div className={css.inner}>
                                <small>
                                    Увага! Ви не веріфікували вашу пошту. Для верифікації потрібно перейти за посилання в листі,
                                    що ми надіслали на вашу пошту.
                                </small>
                                <button type="button" onClick={handleEmail} className={css.link}>
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
