import React, { useEffect, useMemo } from 'react';

import Sync from '@mui/icons-material/Sync';
import { useFormik } from 'formik';

import useFormikError from '../../../../../hooks/formik-error.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { SelectValue } from '../../../../../interfaces';
import { INewPostPayload } from '../../../../../state/entities/posts/posts.interface';
import { useSinglePostSelector } from '../../../../../state/entities/posts/posts.selector';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import Button from '../../../../common/button/button';
import { modal } from '../../../../common/modal/modal';
import Select from '../../../../common/select/select';
import Textarea from '../../../../common/textarea/textarea';
import Filters from '../../new/new-post-form/filters/filters';
import FormSeparator from '../../new/new-post-form/form-separator/form-separator';
import FormTemplateModal from '../../new/new-post-form/form-template-modal/form-template-modal';
import FormSegment from '../../new/new-post-form/from-segment/from-segment';
import {
    cities,
    districtKyiv,
    districtLviv,
    formatSelectValue,
    houseType,
    price,
    residentsAmount,
    rooms,
} from '../../new/new-post-form/new-post-form.config';
import css from '../../new/new-post-form/new-post-form.module.scss';
import { getDescriptionTemplate, getTitleTemplate } from '../../new/new-post-form/new-post-form.utils';

import { normalizePostData } from './edit-post-form.config';
import { EditPostFormSchema } from './edit-post-form.validation';

const TEMPLATES_AMOUNT_ARRAY = [0, 1, 2, 3, 4];

const EditPostForm = (): JSX.Element => {
    const trans = useTrans();

    const postState = useSinglePostSelector();
    const profileData = useProfileInfoSelector();

    const errorHandler = useFormikError<INewPostPayload>();
    const formik = useFormik<INewPostPayload>({
        initialValues: normalizePostData(postState.data),
        validationSchema: EditPostFormSchema,
        onSubmit: values => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(values);
        },
    });

    useEffect(() => {
        errorHandler(formik);
    }, [errorHandler, formik]);

    const titleTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getTitleTemplate({ ...formik.values, ...profileData.data }, trans, index)),
        [formik.values, profileData.data, trans],
    );
    const descriptionTemplateList = useMemo(
        () =>
            TEMPLATES_AMOUNT_ARRAY.map(index => getDescriptionTemplate({ ...formik.values, ...profileData.data }, trans, index)),
        [formik.values, profileData.data, trans],
    );

    const openTitleTemplateModal = (): void =>
        modal.open(
            <FormTemplateModal
                title="Шаблони заголовку"
                onChange={(index: number) => formik.setFieldValue('title', titleTemplateList[index])}
                list={titleTemplateList}
            />,
        );
    const openDescriptionTemplateModal = (): void =>
        modal.open(
            <FormTemplateModal
                title="Шаблони опису"
                onChange={(index: number) => formik.setFieldValue('description', descriptionTemplateList[index])}
                list={descriptionTemplateList}
            />,
        );

    const changeResidentsAmount = (value: SelectValue): void => {
        formik.setFieldValue('residentsAmount', +value.value);
    };

    const handleSelectCity = (value: SelectValue): void => {
        formik.setFieldValue('cityFilters', value.id);
        formik.setFieldValue('districtFilters', []);
    };

    const resetForm = (): void => {
        formik.resetForm();
    };

    return (
        <form action="#" method="post" className={css.form} onSubmit={formik.handleSubmit}>
            <FormSeparator />
            <FormSegment label="title" id="new_post_title" error={formik.touched.title && formik.errors.title}>
                <>
                    <Textarea
                        id="new_post_title"
                        className={css.input}
                        rootClassName={css.inputWrp}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && formik.errors.title}
                        placeholder="title"
                        name="title"
                    />
                    <button className={css.link} type="button" onClick={openTitleTemplateModal}>
                        <Sync />
                        Змінити шаблон
                    </button>
                </>
            </FormSegment>
            <FormSegment
                label="description"
                id="new_post_description"
                error={formik.touched.description && formik.errors.description}
            >
                <>
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
                    <button className={css.link} type="button" onClick={openDescriptionTemplateModal}>
                        <Sync />
                        Змінити шаблон
                    </button>
                </>
            </FormSegment>
            <FormSeparator />
            <FormSegment
                label="residentsAmount"
                id="residents_amount"
                error={formik.touched.residentsAmount && formik.errors.residentsAmount}
            >
                <Select
                    className={css.select}
                    list={residentsAmount}
                    placeholder="residentsAmount"
                    onChange={changeResidentsAmount}
                    value={residentsAmount.find(item => +item.value === formik.values.residentsAmount)}
                    error={formik.touched.residentsAmount && !!formik.errors.residentsAmount}
                />
            </FormSegment>
            <FormSegment
                id="children"
                label="children"
                required={false}
                error={formik.touched.children && formik.errors.children}
            >
                <>
                    <small>Залиште це поле порожнім якщо у вас немає дітей</small>
                    <Textarea
                        id="children"
                        className={css.input}
                        rootClassName={css.inputWrp}
                        value={formik.values.children}
                        onChange={formik.handleChange}
                        placeholder="children"
                        name="children"
                    />
                </>
            </FormSegment>
            <FormSegment id="pets" label="pets" required={false} error={formik.touched.pets && formik.errors.pets}>
                <>
                    <small>Залиште це поле порожнім якщо у вас немає домашніх тварин</small>
                    <Textarea
                        id="pets"
                        className={css.input}
                        rootClassName={css.inputWrp}
                        value={formik.values.pets}
                        onChange={formik.handleChange}
                        placeholder="pets"
                        name="pets"
                    />
                </>
            </FormSegment>
            <FormSeparator />
            <FormSegment label="houseType" error={formik.touched.houseTypeFilters && formik.errors.houseTypeFilters}>
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
                    size="lg"
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
            <FormSeparator>* обовязкові для заповнення поля</FormSeparator>
            <div className={css.flex}>
                <Button onClick={resetForm} secondary disabled={!formik.dirty}>
                    Відновити
                </Button>
                <Button loading={false} type="submit" primary>
                    Зберегти зміни
                </Button>
            </div>
        </form>
    );
};

export default EditPostForm;
