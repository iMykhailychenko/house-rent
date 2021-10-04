import React, { ReactElement } from 'react';

import { ArrowBack } from '@material-ui/icons';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { FORM_TYPE, IStepThree } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import Button from '../../../../../common/button/button';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import Input from '../../../../../common/input/input';
import Textarea from '../../../../../common/textarea/textarea';
import FormSeparator from '../form-separator/form-separator';
import FormSegment from '../from-segment/from-segment';
import css from '../new-post-form.module.scss';
import { FormThreeSchema } from '../new-post-form.validation';

interface IProps {
    initialValues: IStepThree;
    onSubmit: (value: IStepThree) => void;
}

const FormTypeThree = ({ initialValues, onSubmit }: IProps): ReactElement => {
    const dispatch = useAppDispatch();

    const formik = useFormik<IStepThree>({
        initialValues,
        validationSchema: FormThreeSchema,
        onSubmit: values => {
            onSubmit(values);
            dispatch(updateFormType(FORM_TYPE.FOUR));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    });

    const goBack = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSubmit(formik.values);
        dispatch(updateFormType(FORM_TYPE.TWO));
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

            <FormSeparator>* обовязкові для заповнення поля</FormSeparator>
            <div className={css.flex}>
                <Button className={css.arrow} onClick={goBack} secondary>
                    <ArrowBack />
                </Button>
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

export default FormTypeThree;
