import React, { useEffect, useMemo } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Sync from '@mui/icons-material/Sync';
import { useFormik } from 'formik';

import useFormikError from '../../../../../../hooks/formik-error.hook';
import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { useGetDescriptionTemplate, useGetTitleTemplate } from '../../../../../../hooks/template/get-template.hook';
import { FORM_TYPE, IStepThree } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import Button from '../../../../../common/button/button';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import { modal } from '../../../../../common/modal/modal';
import Textarea from '../../../../../common/textarea/textarea';
import FormSeparator from '../form-separator/form-separator';
import FormTemplateModal from '../form-template-modal/form-template-modal';
import FormSegment from '../from-segment/from-segment';
import { formThreeInitialState, TemplateDataType } from '../new-post-form';
import css from '../new-post-form.module.scss';
import { FormThreeSchema } from '../new-post-form.validation';

const TEMPLATES_AMOUNT_ARRAY = [0, 1, 2, 3, 4];

interface IProps {
    allData: TemplateDataType;
    initialValues: IStepThree;
    onSubmit: (value: IStepThree) => void;
}

const FormTypeThree = ({ initialValues, onSubmit, allData }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const getTitleTemplate = useGetTitleTemplate();
    const getDescriptionTemplate = useGetDescriptionTemplate();

    const errorHandler = useFormikError<IStepThree>();
    const formik = useFormik<IStepThree>({
        initialValues,
        validationSchema: FormThreeSchema,
        onSubmit: values => {
            onSubmit(values);
            dispatch(updateFormType(FORM_TYPE.FOUR));
        },
    });

    useEffect(() => {
        errorHandler(formik);
    }, [errorHandler, formik]);

    const titleTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getTitleTemplate(allData, index)),
        [allData, getTitleTemplate],
    );
    const descriptionTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getDescriptionTemplate(allData, index)),
        [allData, getDescriptionTemplate],
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

    const goBack = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSubmit(formik.values);
        dispatch(updateFormType(FORM_TYPE.TWO));
    };
    const resetForm = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        formik.setValues(formThreeInitialState);
    };
    const submitForm = async (): Promise<void> => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await formik.submitForm();
    };

    return (
        <form action="#" method="post" className={css.form}>
            <ImageWrp name="life" />
            <FormSeparator>
                Загальна інформація про вас. Власникам квартир важливо розуміти кому вони здаватимуть житло
            </FormSeparator>
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
