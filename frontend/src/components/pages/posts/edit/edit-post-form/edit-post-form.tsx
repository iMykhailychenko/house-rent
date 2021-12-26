import React, { useContext, useEffect, useMemo } from 'react';

import Sync from '@mui/icons-material/Sync';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import useFormikError from '../../../../../hooks/formik-error.hook';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import useSortPrice from '../../../../../hooks/sort-price.hook';
import useSortRooms from '../../../../../hooks/sort-room.hook';
import { useGetDescriptionTemplate, useGetTitleTemplate } from '../../../../../hooks/template/get-template.hook';
import { SelectValue } from '../../../../../interfaces';
import { mediaThunk } from '../../../../../state/entities/media/media.reducer';
import { INewPostPayload } from '../../../../../state/entities/posts/posts.interface';
import { useSinglePostSelector } from '../../../../../state/entities/posts/posts.selector';
import { updatePostThunk } from '../../../../../state/entities/posts/thunks/update-post.thunk';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import routes from '../../../../../utils/routes';
import { banner } from '../../../../common/banner/banner';
import { BannerType } from '../../../../common/banner/banner.interface';
import Button from '../../../../common/button/button';
import { modal } from '../../../../common/modal/modal';
import Select from '../../../../common/select/select';
import Textarea from '../../../../common/textarea/textarea';
import Filters from '../../new/new-post-form/filters/filters';
import FormResidents from '../../new/new-post-form/form-residents/form-residents';
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
    rooms,
} from '../../new/new-post-form/new-post-form.config';
import css from '../../new/new-post-form/new-post-form.module.scss';
import { UploadContext } from '../update-image/update-image.context';

import { normalizePostData } from './edit-post-form.config';
import { EditPostFormSchema } from './edit-post-form.validation';

const TEMPLATES_AMOUNT_ARRAY = [0, 1, 2, 3, 4];

const EditPostForm = (): JSX.Element => {
    const history = useRouter();
    const dispatch = useAppDispatch();

    const sortPrice = useSortPrice();
    const sortRooms = useSortRooms();

    const postState = useSinglePostSelector();
    const profileState = useProfileInfoSelector();

    const [file] = useContext(UploadContext);
    const getTitleTemplate = useGetTitleTemplate();
    const getDescriptionTemplate = useGetDescriptionTemplate();

    const errorHandler = useFormikError<INewPostPayload>();
    const formik = useFormik<INewPostPayload>({
        enableReinitialize: true,
        initialValues: normalizePostData(postState.data),
        validationSchema: EditPostFormSchema,
        onSubmit: async values => {
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (file) {
                values.image = (await dispatch(mediaThunk(file)).unwrap()).url;
            }

            const newPost = await dispatch(updatePostThunk({ id: postState.data.id, body: values })).unwrap();
            if (newPost) {
                await history.push(routes.posts.single(newPost.id));
                banner.add({ id: 'UPDATE_POST', type: BannerType.SUCCESS, content: 'Ваш пост успішно оновлено' });
            }
        },
    });

    useEffect(() => {
        errorHandler(formik);
    }, [errorHandler, formik]);

    const titleTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getTitleTemplate({ ...formik.values, ...profileState.data }, index)),
        [formik.values, getTitleTemplate, profileState.data],
    );
    const descriptionTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getDescriptionTemplate({ ...formik.values, ...profileState.data }, index)),
        [formik.values, getDescriptionTemplate, profileState.data],
    );

    const openTitleTemplateModal = (): void => {
        modal.open(
            <FormTemplateModal
                title="Шаблони заголовку"
                list={titleTemplateList}
                onChange={(index: number) => formik.setFieldValue('title', titleTemplateList[index])}
            />,
        );
    };

    const openDescriptionTemplateModal = async (): Promise<void> => {
        console.log(formik.values.priceFilters);
        modal.open(
            <FormTemplateModal
                title="Шаблони опису"
                list={descriptionTemplateList}
                onChange={(index: number) => formik.setFieldValue('description', descriptionTemplateList[index])}
            />,
        );
    };

    const handlePrice = (name: string, value: string[]): void => {
        formik.setFieldValue(name, sortPrice(value));
    };

    const handleRooms = (name: string, value: string[]): void => {
        formik.setFieldValue(name, sortRooms(value));
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
                <FormResidents value={formik.values.residentsAmount} onChange={formik.setFieldValue} />
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
                    onChange={handleRooms}
                    value={formik.values.roomFilters}
                    error={formik.touched.roomFilters && !!formik.errors.roomFilters}
                />
            </FormSegment>
            <FormSeparator />
            <FormSegment label="price" error={formik.touched.priceFilters && formik.errors.priceFilters}>
                <Filters
                    size="lg"
                    all={price}
                    name="priceFilters"
                    onChange={handlePrice}
                    value={formik.values.priceFilters}
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
            <div className={clsx(css.flex, css.end)}>
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
