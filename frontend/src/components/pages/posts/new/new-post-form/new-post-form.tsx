import React, { ReactElement } from 'react';

import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { SelectValue } from '../../../../../interfaces';
import { INewPostPayload } from '../../../../../state/entities/posts/posts.interface';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';
import { newPostThunk } from '../../../../../state/entities/posts/posts.thunk';
import Button from '../../../../common/button/button';
import Input from '../../../../common/input/input';
import Select from '../../../../common/select/select';
import Textarea from '../../../../common/textarea/textarea';

import Filters from './filters/filters';
import FormSegment from './from-segment/from-segment';
import { cities, districtKyiv, districtLviv, formatSelectValue, houseType, price, rooms } from './new-post-form.config';
import css from './new-post-form.module.scss';
import NewPostSchema from './new-post-form.validation';

const NewPostForm = (): ReactElement => {
    const dispatch = useDispatch();
    const newPostState = useNewPostSelector();

    const formik = useFormik<INewPostPayload>({
        initialValues: {
            title: '',
            description: '',
            house_type: [],
            rooms: [],
            price: [],
            city: 'kyiv',
            district: [],
        },
        validationSchema: NewPostSchema,
        onSubmit: values => {
            dispatch(newPostThunk(values));
        },
    });

    const handleSelectCity = (value: SelectValue): void => {
        formik.setFieldValue('city', value.id);
        formik.setFieldValue('district', []);
    };

    const resetForm = () => formik.resetForm();
    const submitForm = () => formik.submitForm();

    return (
        <form action="#" method="post" className={css.form}>
            <FormSegment label="title" id="login_title" error={formik.touched.title && formik.errors.title}>
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

            <FormSegment
                label="description"
                id="new_post_description"
                error={formik.touched.description && formik.errors.description}
            >
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

            <FormSegment label="house_type" error={formik.touched.house_type && formik.errors.house_type}>
                <Filters
                    all={houseType}
                    name="house_type"
                    value={formik.values.house_type}
                    onChange={formik.setFieldValue}
                    error={formik.touched.house_type && !!formik.errors.house_type}
                />
            </FormSegment>

            <FormSegment label="rooms" error={formik.touched.rooms && formik.errors.rooms}>
                <Filters
                    size="lg"
                    all={rooms}
                    name="rooms"
                    value={formik.values.rooms}
                    onChange={formik.setFieldValue}
                    error={formik.touched.rooms && !!formik.errors.rooms}
                />
            </FormSegment>

            <FormSegment label="price" error={formik.touched.price && formik.errors.price}>
                <Filters
                    size="sm"
                    all={price}
                    name="price"
                    value={formik.values.price}
                    onChange={formik.setFieldValue}
                    error={formik.touched.price && !!formik.errors.price}
                />
            </FormSegment>

            <FormSegment label="city" error={formik.touched.city && formik.errors.city}>
                <Select
                    list={cities}
                    value={formatSelectValue(formik.values.city)}
                    onChange={handleSelectCity}
                    error={formik.touched.city && !!formik.errors.city}
                />
            </FormSegment>

            <FormSegment label="district" error={formik.touched.district && formik.errors.district}>
                <Filters
                    size="lg"
                    name="district"
                    value={formik.values.district}
                    onChange={formik.setFieldValue}
                    all={formik.values.city === 'kyiv' ? districtKyiv : districtLviv}
                    error={formik.touched.district && !!formik.errors.district}
                />
            </FormSegment>

            <div className={css.flex}>
                <Button onClick={resetForm} secondary>
                    Очистичи
                </Button>
                <Button loading={newPostState.postStatus === 'loading'} onClick={submitForm} primary>
                    Далі
                </Button>
            </div>
        </form>
    );
};

export default NewPostForm;
