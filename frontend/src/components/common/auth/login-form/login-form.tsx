import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useTrans from '../../../../hooks/trans.hook';
import Button from '../../button/button';
import Input from '../../input/input';
import { modal } from '../../modal/modal';
import SmallModalWrp from '../../modal/small-modal-wrp/small-modal-wrp';
import JoinForm from '../join-form/join-form';
import Services from '../services/services';

import css from './login-form.module.scss';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('invalid_email').required('required'),
    password: Yup.string().min(6, 'short_password').max(30, 'long_password').required('required'),
});

const LoginForm = (): ReactElement => {
    const trans = useTrans();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const join = (): void =>
        modal.open(
            <SmallModalWrp title="Зареєструватися">
                <JoinForm />
            </SmallModalWrp>,
        );

    return (
        <form action="#" method="post" onSubmit={formik.handleSubmit}>
            <Input
                id="login_email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                placeholder="example@mail.com"
                name="email"
                label="email"
            />
            <Input
                id="password_email"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                placeholder="password"
                name="password"
                type="password"
                label="password"
            />

            <div className={css.flex}>
                <Button className={css.btn} secondary onClick={join}>
                    {trans('Зареєструватися')}
                </Button>
                <Button className={css.btn} type="submit" primary>
                    {trans('Увійти')}
                </Button>
            </div>

            <p className={css.or}>{trans('або')}</p>

            <Services />
        </form>
    );
};

export default LoginForm;
