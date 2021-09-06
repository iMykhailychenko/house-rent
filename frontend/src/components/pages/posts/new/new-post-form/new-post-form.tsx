import React, { ReactElement, useState } from 'react';

import { FORM_TYPE, IStepOne, IStepTwo } from '../../../../../state/entities/posts/posts.interface';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';

import FormTypeDone from './form-type/form-type-done';
import FormTypeOne from './form-type/form-type-one';
import FormTypeTree from './form-type/form-type-three';
import FormTypeTwo from './form-type/form-type-two';

const formOneInitialState: IStepOne = {
    title: '',
    description: '',
    residentsAmount: '',
    children: '',
    pets: '',
};

const formTwoInitialState: IStepTwo = {
    houseTypeFilters: [],
    roomFilters: [],
    priceFilters: [],
    cityFilters: 'kyiv',
    districtFilters: [],
};

const NewPostForm = (): ReactElement => {
    const newPostState = useNewPostSelector();

    const [formOneState, setFormOneState] = useState<IStepOne>(formOneInitialState);
    const [formTwoState, setFormTwoState] = useState<IStepTwo>(formTwoInitialState);

    const formTypeMap = {
        [FORM_TYPE.ONE]: <FormTypeOne initialValues={formOneState} onSubmit={setFormOneState} />,
        [FORM_TYPE.TWO]: <FormTypeTwo initialValues={formTwoState} onSubmit={setFormTwoState} />,
        [FORM_TYPE.THREE]: <FormTypeTree value={{ ...formOneState, ...formTwoState }} />,
        [FORM_TYPE.DONE]: <FormTypeDone />,
    };

    return formTypeMap[newPostState.formType];
};

export default NewPostForm;
