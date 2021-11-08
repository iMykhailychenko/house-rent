import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import Button from '../../../button/button';
import Input from '../../../input/input';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './change-user-data.module.scss';

const ChangeUserData = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const profileState = useProfileInfoSelector().data;

    const formik = useFormik({
        initialValues: {
            firstName: profileState.firstName,
            lastName: profileState.lastName,
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().min(1, 'short_input').max(50, 'long_input').required('required'),
            lastName: Yup.string().min(1, 'short_input').max(100, 'long_input').required('required'),
        }),
        onSubmit: values => {
            console.log(values);
            console.log(dispatch);
        },
    });

    return (
        <StickyModal
            title="Змінити персональні данні"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary onClick={formik.submitForm}>
                        Змінити
                    </Button>
                </>
            }
        >
            <form action="#" onSubmit={formik.submitForm}>
                <Input
                    id="first_name"
                    className={css.input}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && formik.errors.firstName}
                    name="firstName"
                    label="first_name"
                />

                <Input
                    id="last_name"
                    className={css.input}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && formik.errors.lastName}
                    name="lastName"
                    label="last_name"
                />
            </form>
        </StickyModal>
    );
};

const changeUserData = (): void => {
    modal.open(<ChangeUserData />);
};

export default changeUserData;
