import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../button/button';
import Input from '../../input/input';
import { modal } from '../../modal/modal';

import css from './login-form.module.scss';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('invalid_email').required('required'),
    password: Yup.string().min(6, 'short_password').max(30, 'long_password').required('Required').required('required'),
});

const LoginForm = (): ReactElement => {
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

    return (
        <form action="#" method="post" onSubmit={formik.handleSubmit}>
            <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                placeholder="example@mail.com"
                name="email"
                label="Email"
            />
            <Input
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                placeholder="password"
                name="password"
                type="password"
                label="Password"
            />

            <div className={css.flex}>
                <Button className={css.btn} secondary onClick={modal.close}>
                    Зареєструватися
                </Button>
                <Button className={css.btn} type="submit" primary>
                    Увійти
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
