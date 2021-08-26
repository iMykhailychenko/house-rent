import React, { ReactElement } from 'react';

import { useFormik } from 'formik';

import Input from '../../../common/input/input';
import Textarea from '../../../common/textarea/textarea';
import Container from '../../../layout/container/container';

import css from './new-post-form.module.scss';

const NewPostForm = (): ReactElement => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            filters: {
                rooms: [],
                house_type: [],
                price: [],
                city: [],
                district: [],
            },
        },
        // validationSchema: LoginSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <Container size="sm">
            <h2 className={css.title}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error</h2>

            <form action="#" method="post" className={css.form}>
                <Input
                    id="login_email"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && formik.errors.title}
                    placeholder="title"
                    name="title"
                    label="title"
                />
                
                <Textarea
                    id="login_email"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && formik.errors.description}
                    placeholder="description"
                    name="description"
                    label="description"
                />
            </form>
        </Container>
    );
};

export default NewPostForm;
