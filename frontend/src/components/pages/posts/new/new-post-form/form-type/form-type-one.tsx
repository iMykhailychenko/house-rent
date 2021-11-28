import React, { useEffect } from 'react';

import { useFormik } from 'formik';

import useFormikError from '../../../../../../hooks/formik-error.hook';
import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { FORM_TYPE, IStepOne } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import Button from '../../../../../common/button/button';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import Textarea from '../../../../../common/textarea/textarea';
import FormResidents from '../form-residents/form-residents';
import FormSeparator from '../form-separator/form-separator';
import FormSegment from '../from-segment/from-segment';
import { formOneInitialState } from '../new-post-form';
import css from '../new-post-form.module.scss';
import { FormOneSchema } from '../new-post-form.validation';

interface IProps {
    initialValues: IStepOne;
    onSubmit: (value: IStepOne) => void;
}

const FormTypeOne = ({ initialValues, onSubmit }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const errorHandler = useFormikError<IStepOne>();
    const formik = useFormik<IStepOne>({
        initialValues,
        validationSchema: FormOneSchema,
        onReset: (_, { setValues }) => {
            setValues(formOneInitialState);
        },
        onSubmit: values => {
            onSubmit(values);
            dispatch(updateFormType(FORM_TYPE.TWO));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    });

    useEffect(() => {
        errorHandler(formik);
    }, [errorHandler, formik]);

    const resetForm = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        formik.resetForm();
    };
    const submitForm = () => formik.submitForm();

    return (
        <form action="#" method="post" className={css.form}>
            <ImageWrp name="target" />
            <FormSeparator>
                Загальна інформація про вас. Власникам квартир важливо розуміти кому вони здаватимуть житло
            </FormSeparator>
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
