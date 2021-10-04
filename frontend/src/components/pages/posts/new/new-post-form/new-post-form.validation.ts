import * as Yup from 'yup';

export const FormOneSchema = Yup.object().shape({
    residentsAmount: Yup.number().min(1, 'min_residents_amount').max(15, 'max_residents_amount').required('required'),
    children: Yup.string(),
    pets: Yup.string(),
});

export const FormTwoSchema = Yup.object().shape({
    houseTypeFilters: Yup.array().min(1, 'required').required('required'),
    roomFilters: Yup.array().min(1, 'required').required('required'),
    priceFilters: Yup.array().min(1, 'required').required('required'),
    cityFilters: Yup.string().required('required'),
    districtFilters: Yup.array().min(1, 'required').required('required'),
});

export const FormThreeSchema = Yup.object().shape({
    title: Yup.string().required('required'),
    description: Yup.string().required('required'),
});
