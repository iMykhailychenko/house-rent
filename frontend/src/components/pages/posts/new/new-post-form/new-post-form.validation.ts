import * as Yup from 'yup';

const NewPostSchema = Yup.object().shape({
    title: Yup.string().required('required'),
    description: Yup.string().required('required'),
    houseTypeFilters: Yup.array().min(1, 'required').required('required'),
    roomFilters: Yup.array().min(1, 'required').required('required'),
    priceFilters: Yup.array().min(1, 'required').required('required'),
    cityFilters: Yup.string().required('required'),
    districtFilters: Yup.array().min(1, 'required').required('required'),
});

export default NewPostSchema;
