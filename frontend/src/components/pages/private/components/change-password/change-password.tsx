import React, { useState } from 'react';

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { sendRestorePasswordEmailThunk } from '../../../../../state/entities/auth/auth.thunk';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import Button from '../../../../common/button/button';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import Cell from '../common/cell';
import Row from '../common/row';
import Section from '../common/section';

import css from './change-password.module.scss';

const ChangePassword = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const profileData = useProfileInfoSelector();
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (): Promise<void> => {
        setLoading(true);
        await dispatch(sendRestorePasswordEmailThunk({ email: profileData.data.email }));
        setLoading(false);
    };
    return (
        <Section title="Налаштування приватності" icon={<LockOpenOutlinedIcon />}>
            <Row>
                <Cell>
                    <div className={css.inner}>
                        <ImageWrp name="safe" />
                        <Button className={css.btn} loading={loading} primary onClick={handleChangePassword}>
                            Змінти пароль
                        </Button>
                    </div>
                </Cell>
                <Cell>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam assumenda commodi delectus dicta dolore
                    doloremque eos expedita id molestiae neque nostrum, omnis, sapiente sequi tempore ullam vel voluptatibus.
                    Dignissimos, quia!
                </Cell>
            </Row>
        </Section>
    );
};

export default ChangePassword;
