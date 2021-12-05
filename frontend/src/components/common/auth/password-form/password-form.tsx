import React from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import useAuth from '../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { restorePasswordThunk } from '../../../../state/entities/auth/auth.thunk';
import routes from '../../../../utils/routes';
import Button from '../../button/button';
import Input from '../../input/input';
import Link from '../../link/link';

import css from './password-form.module.scss';

const PasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'short_password')
        .max(30, 'long_password')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{6,}$/, 'invalid_password')
        .required('required'),
});

const PasswordForm = (): JSX.Element => {
    const trans = useTrans();
    const { logout } = useAuth();
    const dispatch = useAppDispatch();

    const history = useRouter();
    const token = String(history.query.token);

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: PasswordSchema,
        onSubmit: async values => {
            await history.push(routes.home, undefined, { shallow: true });
            await dispatch(restorePasswordThunk({ ...values, token }));
            logout();
        },
    });

    return (
        <form action="#" method="post" className={css.form} onSubmit={formik.handleSubmit}>
            <Input
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                placeholder="Новий пароль"
                name="password"
                label="password"
                type="password"
            />

            <div className={css.flex}>
                <Button className={css.btn} type="submit" primary>
                    {trans('Змінити пароль')}
                </Button>
            </div>

            <Link className={css.link} href={routes.auth.login} primary>
                {trans('Увійти в особистий кабінет')}
            </Link>
            <Link className={css.link} href={routes.auth.join} primary>
                {trans('Зареєструватися')}
            </Link>
        </form>
    );
};

export default PasswordForm;
