import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useTrans from '../../../../hooks/trans.hook';
import routes from '../../../../utils/routes';
import Button from '../../button/button';
import Input from '../../input/input';
import Link from '../../link/link';

import css from './reset-form.module.scss';

const ResetSchema = Yup.object().shape({
    email: Yup.string().email('invalid_email').required('required'),
});

const ResetForm = (): ReactElement => {
    const trans = useTrans();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ResetSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form action="#" method="post" onSubmit={formik.handleSubmit}>
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
