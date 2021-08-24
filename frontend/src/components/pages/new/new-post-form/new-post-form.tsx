import React, { ReactElement } from 'react';

import { useFormik } from 'formik';

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

            <div className={css.inner}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius impedit neque nihil pariatur praesentium, qui rerum
                sunt temporibus totam ullam unde ut, voluptatum! Atque cumque dolores dolorum est neque officiis.
            </div>
        </Container>
    );
};

export default NewPostForm;
