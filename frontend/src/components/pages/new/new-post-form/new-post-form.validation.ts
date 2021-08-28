import * as Yup from 'yup';

const NewPostSchema = Yup.object().shape({
    title: Yup.string().required('required'),
    description: Yup.string().required('required'),
    house_type: Yup.array().min(1, 'required').required('required'),
    rooms: Yup.array().min(1, 'required').required('required'),
    price: Yup.array().min(1, 'required').required('required'),
    city: Yup.string().required('required'),
    district: Yup.array().min(1, 'required').required('required'),
});

export default NewPostSchema;
