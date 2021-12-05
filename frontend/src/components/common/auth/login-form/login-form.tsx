import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { ILoginPayload } from '../../../../state/entities/auth/auth.interface';
import { useAuthSelector } from '../../../../state/entities/auth/auth.selector';
import { authLoginThunk } from '../../../../state/entities/auth/auth.thunk';
import routes from '../../../../utils/routes';
import Button from '../../button/button';
import Input from '../../input/input';
import Link from '../../link/link';
import joinModal from '../../modal/modals/join-modal/join-modal';
import Services from '../services/services';

import css from './login-form.module.scss';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('invalid_email').required('required'),
    password: Yup.string().min(6, 'short_password').max(30, 'long_password').required('required'),
});

const LoginForm = (): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const authState = useAuthSelector();

    const formik = useFormik<ILoginPayload>({
        initialValues: {
            email: 'user2@email.com',
            password: 'Asdf1234!',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values): Promise<void> => {
            const data = await dispatch(authLoginThunk(values)).unwrap();
            if (data.accessToken) window.location.reload();
        },
    });

    return (
        <form action="#" method="post" className={css.form} onSubmit={formik.handleSubmit}>
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

            <Link primary className={css.reset} href={routes.auth.reset}>
                {trans('Забули пароль?')}
            </Link>

            <div className={css.flex}>
                <Button className={css.btn} secondary onClick={joinModal}>
                    {trans('Зареєструватися')}
                </Button>
                <Button loading={authState.loginStatus === 'loading'} className={css.btn} type="submit" primary>
                    {trans('Увійти')}
                </Button>
            </div>

            <p className={css.or}>{trans('або')}</p>

            <Services />
        </form>
    );
};

export default LoginForm;
