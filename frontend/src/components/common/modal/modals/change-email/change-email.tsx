import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { changeEmailThunk } from '../../../../../state/entities/profile/profile.thunk';
import Button from '../../../button/button';
import Input from '../../../input/input';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './change-email.module.scss';

const ChangeEmail = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('invalid_email').required('required'),
        }),
        onSubmit: async values => {
            setLoading(true);
            await dispatch(changeEmailThunk(values));
            modal.close();
        },
    });

    return (
        <StickyModal
            title="Змінити пошту"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary loading={loading} onClick={formik.submitForm}>
                        Змінити
                    </Button>
                </>
            }
        >
            <form action="#" onSubmit={formik.submitForm}>
                <Input
                    id="email"
                    name="email"
                    className={css.input}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                    placeholder="example@mail.com"
                    label="Введіть нову електронну пошту"
                />
            </form>
        </StickyModal>
    );
};

const changeEmailModal = (): void => {
    modal.open(<ChangeEmail />);
};

export default changeEmailModal;
