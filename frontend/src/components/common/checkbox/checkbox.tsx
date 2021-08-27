import React, { ReactElement } from 'react';

import CheckboxLg from './checkbox-lg/checkbox-lg';
import CheckboxSm from './checkbox-sm/checkbox-sm';

interface IProps {
    size?: 'sm' | 'lg';
    name?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox = ({ size = 'sm', name, title, value, onChange }: IProps): ReactElement => {
    const map = {
        sm: <CheckboxSm title={title} value={value} onChange={onChange} name={name} />,
        lg: <CheckboxLg title={title} value={value} onChange={onChange} name={name} />,
    };

    return map[size];
};

export default Checkbox;
