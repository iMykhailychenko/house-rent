import React, { useEffect } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';

import useFormikError from '../../../../../../hooks/formik-error.hook';
import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import useSortPrice from '../../../../../../hooks/sort-price.hook';
import useSortRooms from '../../../../../../hooks/sort-room.hook';
import { SelectValue } from '../../../../../../interfaces';
import { FORM_TYPE, IStepTwo } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import { useNewPostSelector } from '../../../../../../state/entities/posts/posts.selector';
import Button from '../../../../../common/button/button';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import Select from '../../../../../common/select/select';
import Filters from '../filters/filters';
import FormSeparator from '../form-separator/form-separator';
import FormSegment from '../from-segment/from-segment';
import { formTwoInitialState } from '../new-post-form';
import { cities, districtKyiv, districtLviv, formatSelectValue, houseType, price, rooms } from '../new-post-form.config';
import css from '../new-post-form.module.scss';
import { FormTwoSchema } from '../new-post-form.validation';

interface IProps {
    initialValues: IStepTwo;
    onSubmit: (value: IStepTwo) => void;
}

const FormTypeTwo = ({ initialValues, onSubmit }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const newPostState = useNewPostSelector();

    const sortPrice = useSortPrice();
    const sortRooms = useSortRooms();

    const errorHandler = useFormikError<IStepTwo>();
    const formik = useFormik<IStepTwo>({
        initialValues,
        validationSchema: FormTwoSchema,
        onSubmit: values => {
            onSubmit(values);
            dispatch(updateFormType(FORM_TYPE.THREE));
        },
    });

    useEffect(() => {
        errorHandler(formik);
    }, [errorHandler, formik]);

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        formik.setValues(formTwoInitialState);
    };
    const goBack = async (): Promise<void> => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSubmit(formik.values);
        dispatch(updateFormType(FORM_TYPE.ONE));
    };
    const submitForm = async (): Promise<void> => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await formik.submitForm();
    };

    return (
        <form action="#" method="post" className={css.form}>
            <ImageWrp name="form" />
            <FormSeparator>Укажіть інформацію про квартиру, яку ви шукаєте</FormSeparator>
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
            <div className={css.flex}>
                <Button className={css.arrow} onClick={goBack} secondary>
                    <ArrowBack />
                </Button>
                <Button onClick={resetForm} secondary>
                    Очистичи
                </Button>
                <Button loading={newPostState.status === 'loading'} onClick={submitForm} primary>
                    Далі
                </Button>
            </div>
        </form>
    );
};

export default FormTypeTwo;
