import React from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { sendRestorePasswordEmailThunk } from '../../../../state/entities/auth/auth.thunk';
import routes from '../../../../utils/routes';
import Button from '../../button/button';
import Input from '../../input/input';
import Link from '../../link/link';

import css from './reset-form.module.scss';

const ResetSchema = Yup.object().shape({
    email: Yup.string().email('invalid_email').required('required'),
});

const ResetForm = (): JSX.Element => {
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ResetSchema,
        onSubmit: async values => {
            await history.push(routes.home);
            await dispatch(sendRestorePasswordEmailThunk(values));
        },
    });

    return (
        <form action="#" method="post" className={css.form} onSubmit={formik.handleSubmit}>
            <Input
                id="reset_email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                placeholder="example@mail.com"
                name="email"
                label="email"
            />

            <div className={css.flex}>
                <Button className={css.btn} type="submit" primary>
                    {trans('Відновити пароль')}
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

export default ResetForm;
