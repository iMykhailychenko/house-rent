import React from 'react';

import LoginForm from '../../../auth/login-form/login-form';
import SmallModalWrp from '../../components/small-modal-wrp/small-modal-wrp';
import { modal } from '../../modal';

const loginModal = (): void => {
    modal.open(
        <SmallModalWrp title="Увійти в особистий кабінет">
            <LoginForm />
        </SmallModalWrp>,
    );
};

export default loginModal;
