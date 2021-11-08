import React from 'react';

import CheckboxLg from './checkbox-lg/checkbox-lg';
import CheckboxSm from './checkbox-sm/checkbox-sm';

interface IProps {
    className?: string;
    error?: boolean;
    size?: 'sm' | 'lg';
    name?: string;
    small?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox = ({ className, error = false, size = 'sm', name, title, value, small, onChange }: IProps): JSX.Element => {
    const map = {
        sm: <CheckboxSm className={className} error={error} title={title} value={value} onChange={onChange} name={name} />,
        lg: (
            <CheckboxLg
                className={className}
                error={error}
                title={title}
                small={small}
                value={value}
                onChange={onChange}
                name={name}
            />
        ),
    };

    return map[size];
};

export default Checkbox;
