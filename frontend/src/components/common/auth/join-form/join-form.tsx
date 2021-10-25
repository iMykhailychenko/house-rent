import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import useTrans from '../../../../hooks/trans.hook';
import { useAuthSelector } from '../../../../state/entities/auth/auth.selector';
import { authJoinThunk } from '../../../../state/entities/auth/auth.thunk';
import Button from '../../button/button';
import Input from '../../input/input';
import { modal } from '../../modal/modal';
import SmallModalWrp from '../../modal/small-modal-wrp/small-modal-wrp';
import LoginForm from '../login-form/login-form';
import Services from '../services/services';

import css from './join-form.module.scss';

const JoinSchema = Yup.object().shape({
    firstName: Yup.string().min(1, 'short_input').max(50, 'long_input').required('required'),
    lastName: Yup.string().min(1, 'short_input').max(100, 'long_input').required('required'),
    email: Yup.string().email('invalid_email').required('required'),
    password: Yup.string()
        .min(6, 'short_password')
        .max(30, 'long_password')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{6,}$/, 'invalid_password')
        .required('required'),
});

interface PasswordInfoProps {
    value: string;
}

const PasswordInfo = ({ value }: PasswordInfoProps): ReactElement => {
    const trans = useTrans();

    return (
        <ul className={css.list}>
            <li className={clsx(css.red, value.length > 7 && css.green)}>{trans('minimum_characters')}</li>
            <li className={clsx(css.red, /[0-9]/.test(value) && css.green)}>{trans('numbers_letters')}</li>
            <li className={clsx(css.red, /[A-Z]/.test(value) && css.green)}>{trans('uppercase')}</li>
            <li className={clsx(css.red, /[_#?!@$%^&*-]/.test(value) && css.green)}>{trans('special_characters')}</li>
        </ul>
    );
};

const JoinForm = (): ReactElement => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const authState = useAuthSelector();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: 'user2@email.com',
            password: 'Asdf1234!',
        },
        validationSchema: JoinSchema,
        onSubmit: values => {
            dispatch(authJoinThunk(values));
        },
    });

    const login = (): void =>
        modal.open(
            <SmallModalWrp title="Увійти в особистий кабінет">
                <LoginForm />
            </SmallModalWrp>,
        );

    return (
        <form action="#" method="post" className={css.form} onSubmit={formik.handleSubmit}>
            <Input
                id="first_name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && formik.errors.firstName}
                name="firstName"
                label="first_name"
            />

            <Input
                id="last_name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && formik.errors.lastName}
                name="lastName"
                label="last_name"
            />

            <Input
                id="join_email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                placeholder="example@mail.com"
                name="email"
                label="email"
            />

            <Input
                id="join_password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                info={<PasswordInfo value={formik.values.password} />}
                placeholder="password"
                name="password"
                label="password"
                type="password"
            />

            <div className={css.flex}>
                <Button className={css.btn} secondary onClick={login}>
                    {trans('Увійти')}
                </Button>
                <Button
                    loading={authState.joinStatus === 'loading' || authState.joinStatus === 'success'}
                    className={css.btn}
                    type="submit"
                    primary
                >
                    {trans('Зареєструватися')}
                </Button>
            </div>

            <p className={css.or}>{trans('або')}</p>

            <Services />
        </form>
    );
};

export default JoinForm;
