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
import FormSeparator from './form-separator/form-separator';
import FormImage from './form-image/form-image';

const NewPostForm = (): ReactElement => {
    const dispatch = useDispatch();
    const newPostState = useNewPostSelector();

    const formik = useFormik<INewPostPayload>({
        initialValues: {
            title: '',
            description: '',
            houseTypeFilters: [],
            roomFilters: [],
            priceFilters: [],
            cityFilters: 'kyiv',
            districtFilters: [],
        },
        validationSchema: NewPostSchema,
        onSubmit: values => {
            dispatch(newPostThunk(values));
        },
    });

    const handleSelectCity = (value: SelectValue): void => {
        formik.setFieldValue('cityFilters', value.id);
        formik.setFieldValue('districtFilters', []);
    };

    const resetForm = () => formik.resetForm();
    const submitForm = () => formik.submitForm();

    return (
        <form action="#" method="post" className={css.form}>
            <FormImage />
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
            <FormSeparator />
            <FormSegment label="house_type" error={formik.touched.houseTypeFilters && formik.errors.houseTypeFilters}>
                <Filters
                    all={houseType}
                    name="houseTypeFilters"
                    value={formik.values.houseTypeFilters}
                    onChange={formik.setFieldValue}
                    error={formik.touched.houseTypeFilters && !!formik.errors.houseTypeFilters}
                />
            </FormSegment>

            <FormSegment label="rooms" error={formik.touched.roomFilters && formik.errors.roomFilters}>
                <Filters
                    size="lg"
                    all={rooms}
                    name="roomFilters"
                    value={formik.values.roomFilters}
                    onChange={formik.setFieldValue}
                    error={formik.touched.roomFilters && !!formik.errors.roomFilters}
                />
            </FormSegment>
            <FormSeparator />
            <FormSegment label="price" error={formik.touched.priceFilters && formik.errors.priceFilters}>
                <Filters
                    size="sm"
                    all={price}
                    name="priceFilters"
                    value={formik.values.priceFilters}
                    onChange={formik.setFieldValue}
                    error={formik.touched.priceFilters && !!formik.errors.priceFilters}
                />
            </FormSegment>
            <FormSeparator />
            <FormSegment label="city" error={formik.touched.cityFilters && formik.errors.cityFilters}>
                <Select
                    list={cities}
                    value={formatSelectValue(formik.values.cityFilters)}
                    onChange={handleSelectCity}
                    error={formik.touched.cityFilters && !!formik.errors.cityFilters}
                />
            </FormSegment>

            <FormSegment label="district" error={formik.touched.districtFilters && formik.errors.districtFilters}>
                <Filters
                    size="lg"
                    name="districtFilters"
                    value={formik.values.districtFilters}
                    onChange={formik.setFieldValue}
                    all={formik.values.cityFilters === 'kyiv' ? districtKyiv : districtLviv}
                    error={formik.touched.districtFilters && !!formik.errors.districtFilters}
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
