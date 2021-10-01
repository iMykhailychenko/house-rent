import React, { ReactElement } from 'react';

import { useFormik } from 'formik';

import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { SelectValue } from '../../../../../../interfaces';
import { FORM_TYPE, IStepOne } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import Button from '../../../../../common/button/button';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import Input from '../../../../../common/input/input';
import Select from '../../../../../common/select/select';
import Textarea from '../../../../../common/textarea/textarea';
import FormSeparator from '../form-separator/form-separator';
import FormSegment from '../from-segment/from-segment';
import { residentsAmount } from '../new-post-form.config';
import css from '../new-post-form.module.scss';
import { FormOneSchema } from '../new-post-form.validation';

interface IProps {
    initialValues: IStepOne;
    onSubmit: (value: IStepOne) => void;
}

const FormTypeOne = ({ initialValues, onSubmit }: IProps): ReactElement => {
    const dispatch = useAppDispatch();

    const formik = useFormik<IStepOne>({
        initialValues,
        validationSchema: FormOneSchema,
        onSubmit: values => {
            onSubmit(values);
            dispatch(updateFormType(FORM_TYPE.TWO));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    });

    const changeResidentsAmount = (value: SelectValue): void => {
        formik.setFieldValue('residentsAmount', +value.value);
    };

    const resetForm = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        formik.resetForm();
    };
    const submitForm = () => formik.submitForm();

    return (
        <form action="#" method="post" className={css.form}>
            <ImageWrp name="life" />
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

            <FormSeparator>* обовязкові для заповнення поля</FormSeparator>
            <div className={css.flex}>
                <Button onClick={resetForm} secondary>
                    Очистичи
                </Button>
                <Button onClick={submitForm} primary>
                    Далі
                </Button>
            </div>
        </form>
    );
};

export default FormTypeOne;
