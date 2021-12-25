import React from 'react';

import Button from '@mui/material/Button';
import clsx from 'clsx';

import useTrans from '../../../../../../hooks/trans.hook';
import { residentsAmount } from '../new-post-form.config';

import css from './form-residents.module.scss';

interface IProps {
    value: string;
    onChange: (name: string, value: string) => void;
}
const FormResidents = ({ value, onChange }: IProps): JSX.Element => {
    const trans = useTrans();

    const handleChange = (amount: string) => (): void => {
        onChange('residentsAmount', amount);
    };

    return (
        <div className={css.root}>
            {residentsAmount.map(item => (
                <Button
                    key={item}
                    type="button"
                    onClick={handleChange(item)}
                    className={clsx(css.button, value === item && css.active)}
                >
                    {trans(item)}
                </Button>
            ))}
        </div>
    );
};

export default FormResidents;
