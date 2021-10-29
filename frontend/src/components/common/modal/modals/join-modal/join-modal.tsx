import React from 'react';

import JoinForm from '../../../auth/join-form/join-form';
import SmallModalWrp from '../../components/small-modal-wrp/small-modal-wrp';
import { modal } from '../../modal';

const joinModal = (): void => {
    modal.open(
        <SmallModalWrp title="Зареєструватися">
            <JoinForm />
        </SmallModalWrp>,
    );
};

export default joinModal;
