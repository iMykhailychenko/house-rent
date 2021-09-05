import React, { ReactElement } from 'react';

import { useFormik } from 'formik';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { SelectValue } from '../../../../../interfaces';
import { INewPostPayload } from '../../../../../state/entities/posts/posts.interface';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';
import { newPostThunk } from '../../../../../state/entities/posts/posts.thunk';
import Button from '../../../../common/button/button';
import ImageWrp from '../../../../common/image-wrp/image-wrp';
import Input from '../../../../common/input/input';
import Select from '../../../../common/select/select';
import Textarea from '../../../../common/textarea/textarea';

import Filters from './filters/filters';
import FormSeparator from './form-separator/form-separator';
import FormSegment from './from-segment/from-segment';
import {
    cities,
    districtKyiv,
    districtLviv,
    formatSelectValue,
    houseType,
    price,
    residentsAmount,
    rooms,
} from './new-post-form.config';
import css from './new-post-form.module.scss';
import NewPostSchema from './new-post-form.validation';

const NewPostForm = (): ReactElement => {
    const dispatch = useAppDispatch();
    const newPostState = useNewPostSelector();

    const formik = useFormik<INewPostPayload>({
        initialValues: {
            title: '',
            description: '',
            residentsAmount: [],
            children: '',
            houseTypeFilters: [],
            roomFilters: [],
            priceFilters: [],
            cityFilters: 'kyiv',
            districtFilters: [],
        },
        validationSchema: NewPostSchema,
        onSubmit: values => {
            dispatch(newPostThunk(values)).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
        },
    });

    const handleSelectCity = (value: SelectValue): void => {
        formik.setFieldValue('cityFilters', value.id);
        formik.setFieldValue('districtFilters', []);
    };

    const resetForm = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        formik.resetForm();
    };
    const submitForm = () => formik.submitForm();

    return (
        <form action="#" method="post" className={css.form}>
            <ImageWrp name="form" />
            <FormSeparator>
                Загальна інформація про вас. Власникам квартир важливо розуміти кому вони здаватимуть житло
            </FormSeparator>
            <FormSegment label="title" id="new_post_title" error={formik.touched.title && formik.errors.title}>
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
            <FormSegment label="residents_amount" error={formik.touched.residentsAmount && formik.errors.residentsAmount}>
                <Filters
                    size="lg"
                    all={residentsAmount}
                    name="residentsAmount"
                    value={formik.values.residentsAmount}
                    onChange={formik.setFieldValue}
                    error={formik.touched.residentsAmount && !!formik.errors.residentsAmount}
                />
            </FormSegment>
            <FormSegment
                id="children"
                label="children"
                required={false}
                error={formik.touched.children && formik.errors.children}
            >
                <Input
                    id="children"
                    className={css.input}
                    rootClassName={css.inputWrp}
                    value={formik.values.children}
                    onChange={formik.handleChange}
                    placeholder="children"
                    name="children"
                />
            </FormSegment>

            <FormSeparator>Укажіть інформацію про квартиру, яку ви шукаєте</FormSeparator>
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
            <FormSegment label="price" error={formik.touched.priceFilters && formik.errors.priceFilters}>
                <Filters
                    size="lg"
                    all={price}
                    name="priceFilters"
                    value={formik.values.priceFilters}
                    onChange={formik.setFieldValue}
                    error={formik.touched.priceFilters && !!formik.errors.priceFilters}
                />
            </FormSegment>
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
                    size="sm"
                    name="districtFilters"
                    value={formik.values.districtFilters}
                    onChange={formik.setFieldValue}
                    all={formik.values.cityFilters === 'kyiv' ? districtKyiv : districtLviv}
                    error={formik.touched.districtFilters && !!formik.errors.districtFilters}
                />
            </FormSegment>

            <FormSeparator>* обовязкові для заповнення поля</FormSeparator>
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
