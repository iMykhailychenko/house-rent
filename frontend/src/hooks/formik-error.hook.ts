import { useCallback, useEffect } from 'react';

import { FormikProps } from 'formik';

import { banner } from '../components/common/banner/banner';
import { BannerType } from '../components/common/banner/banner.interface';

import useTrans from './trans.hook';

type FormikError<T> = (formik: FormikProps<T>) => void;
const useFormikError = <T>(): FormikError<T> => {
    const trans = useTrans();

    return useCallback(
        formik => {
            const errors = Object.entries(formik.errors);
            const touched = Object.entries(formik.touched);
            banner.removeAll();

            if (errors.length && touched.length) {
                const [[field, error]] = errors;
                banner.add({
                    id: 'test',
                    type: BannerType.ERROR,
                    content: trans(error as string) + ' - ' + trans(field),
                });
            }
        },
        [trans],
    );
};

export default useFormikError;
