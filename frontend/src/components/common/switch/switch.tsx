import React from 'react';

import SwitchLg from './switch-lg/switch-lg';
import SwitchSm from './switch-sm/switch-sm';

interface IProps {
    size?: 'sm' | 'lg';
    value: boolean;
    onChange?: (value: boolean) => void;
    labels?: [string, string];
    className?: string;
    width?: number;
}

const Switch = ({ value, onChange, labels, size = 'sm', className, width }: IProps): JSX.Element => {
    return size === 'sm' ? (
        <SwitchSm value={value} onChange={onChange} className={className} />
    ) : (
        <SwitchLg value={value} onChange={onChange} labels={labels} className={className} width={width} />
    );
};

export default Switch;
