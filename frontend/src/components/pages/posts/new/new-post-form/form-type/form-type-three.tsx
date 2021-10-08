import React, { ReactElement, useMemo } from 'react';

import ArrowBack from '@material-ui/icons/ArrowBack';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import useTrans from '../../../../../../hooks/trans.hook';
import { FORM_TYPE, IStepThree } from '../../../../../../state/entities/posts/posts.interface';
import { updateFormType } from '../../../../../../state/entities/posts/posts.reducer';
import Button from '../../../../../common/button/button';
import ImageWrp from '../../../../../common/image-wrp/image-wrp';
import { modal } from '../../../../../common/modal/modal';
import Textarea from '../../../../../common/textarea/textarea';
import FormSeparator from '../form-separator/form-separator';
import FormTemplateModal from '../form-template-modal/form-template-modal';
import FormSegment from '../from-segment/from-segment';
import { TemplateDataType } from '../new-post-form';
import css from '../new-post-form.module.scss';
import { getDescriptionTemplate, getTitleTemplate } from '../new-post-form.utils';
import { FormThreeSchema } from '../new-post-form.validation';

const TEMPLATES_AMOUNT_ARRAY = [0, 1, 2, 3, 4];

interface IProps {
    allData: TemplateDataType;
    initialValues: IStepThree;
    onSubmit: (value: IStepThree) => void;
}

const FormTypeThree = ({ initialValues, onSubmit, allData }: IProps): ReactElement => {
    const trans = useTrans();
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

    const titleTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getTitleTemplate(allData, trans, index)),
        [allData, trans],
    );
    const descriptionTemplateList = useMemo(
        () => TEMPLATES_AMOUNT_ARRAY.map(index => getDescriptionTemplate(allData, trans, index)),
        [allData, trans],
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
                <>
                    <button className={css.link} type="button" onClick={openTitleTemplateModal}>
                        <SwapHorizIcon />
                        змінити шаблон
                    </button>
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
                </>
            </FormSegment>
            <FormSegment
                label="description"
                id="new_post_description"
                error={formik.touched.description && formik.errors.description}
            >
                <>
                    <button className={css.link} type="button" onClick={openDescriptionTemplateModal}>
                        <SwapHorizIcon />
                        змінити шаблон
                    </button>
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
