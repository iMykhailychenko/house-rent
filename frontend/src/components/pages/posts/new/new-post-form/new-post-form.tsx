import React, { ReactElement, useState } from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { FORM_TYPE, IStepOne, IStepThree, IStepTwo } from '../../../../../state/entities/posts/posts.interface';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';

import FormTypeDone from './form-type/form-type-done';
import FormTypeFour from './form-type/form-type-four';
import FormTypeOne from './form-type/form-type-one';
import FormTypeThree from './form-type/form-type-three';
import FormTypeTwo from './form-type/form-type-two';
import { getDescriptionTemplate, getTitleTemplate } from './new-post-form.utils';

const formOneInitialState: IStepOne = {
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

const formThreeInitialState: IStepThree = {
    title: '',
    description: '',
};

const NewPostForm = (): ReactElement => {
    const trans = useTrans();
    const newPostState = useNewPostSelector();
    const profileData = useProfileInfoSelector();

    const [formOneState, setFormOneState] = useState<IStepOne>(formOneInitialState);
    const [formTwoState, setFormTwoState] = useState<IStepTwo>(formTwoInitialState);
    const [formThreeState, setFormThreeState] = useState<IStepThree>(formThreeInitialState);

    const submitSecondForm = (value: IStepTwo): void => {
        setFormTwoState(value);
        setFormThreeState({
            title: getTitleTemplate({ ...formOneState, ...value, ...profileData, ...profileData.data }, trans),
            description: getDescriptionTemplate({ ...formOneState, ...value, ...profileData.data }, trans),
        });
    };

    const formTypeMap = {
        [FORM_TYPE.ONE]: <FormTypeOne initialValues={formOneState} onSubmit={setFormOneState} />,
        [FORM_TYPE.TWO]: <FormTypeTwo initialValues={formTwoState} onSubmit={submitSecondForm} />,
        [FORM_TYPE.THREE]: <FormTypeThree initialValues={formThreeState} onSubmit={setFormThreeState} />,
        [FORM_TYPE.FOUR]: <FormTypeFour value={{ ...formOneState, ...formTwoState, ...formThreeState }} />,
        [FORM_TYPE.DONE]: <FormTypeDone />,
    };

    return formTypeMap[newPostState.formType];
};

export default NewPostForm;
