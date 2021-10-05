import { IStepOne, IStepTwo } from '../../../../../state/entities/posts/posts.interface';

import { getTitleTemplate } from './new-post-form.utils';

const mockWithSingleData: IStepOne & IStepTwo = {
    residentsAmount: 2,
    children: '',
    pets: '',
    houseTypeFilters: ['new'],
    roomFilters: ['one'],
    priceFilters: ['price_one'],
    cityFilters: 'kyiv',
    districtFilters: ['darnytsia'],
};

const mockWithMultipleData: IStepOne & IStepTwo = {
    residentsAmount: 2,
    children: '',
    pets: '',
    houseTypeFilters: ['new', 'old'],
    roomFilters: ['one', 'two', 'three'],
    priceFilters: ['price_one', 'price_two', 'price_three'],
    cityFilters: 'kyiv',
    districtFilters: ['desnianskyi', 'dniprovskyi', 'holosiiv', 'obolonskyi'],
};

describe('testing the form filling assistant', () => {
    it('test titleTemplate', () => {
        getTitleTemplate(mockWithSingleData);
    });
});
