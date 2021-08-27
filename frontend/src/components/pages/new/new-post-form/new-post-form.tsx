import React, { ReactElement } from 'react';

import { useFormik } from 'formik';

import Input from '../../../common/input/input';
import Textarea from '../../../common/textarea/textarea';
import Container from '../../../layout/container/container';

import Filters from './filters/filters';
import FormSegment from './from-segment/from-segment';
import { houseType, price, rooms } from './new-post-form.config';
import css from './new-post-form.module.scss';

const NewPostForm = (): ReactElement => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            house_type: ['new'],
            rooms: ['one'],
            price: [],
            city: [],
            district: [],
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
                <FormSegment label="title" id="login_title">
                    <Input
                        id="new_post_title"
                        className={css.input}
                        rootClassName={css.inputWrp}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && formik.errors.title}
                        placeholder="title"
                        name="title"
                    />
                </FormSegment>

                <FormSegment label="description" id="new_post_description">
                    <Textarea
                        id="new_post_description"
                        className={css.input}
                        rootClassName={css.inputWrp}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && formik.errors.description}
                        placeholder="description"
                        name="description"
                    />
                </FormSegment>

                <FormSegment label="house_type">
                    <Filters all={houseType} name="house_type" value={formik.values.house_type} onChange={formik.setFieldValue} />
                </FormSegment>

                <FormSegment label="rooms">
                    <Filters size="lg" all={rooms} name="rooms" value={formik.values.rooms} onChange={formik.setFieldValue} />
                </FormSegment>

                <FormSegment label="price">
                    <Filters size="lg" all={price} name="price" value={formik.values.price} onChange={formik.setFieldValue} />
                </FormSegment>
            </form>
        </Container>
    );
};

export default NewPostForm;
