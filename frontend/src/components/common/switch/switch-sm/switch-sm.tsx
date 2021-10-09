import React, { ReactElement } from 'react';

import Switch from '@mui/material/Switch';

interface IProps {
    value: boolean;
    onChange?: (value: boolean) => void;
    className?: string;
}

const SwitchSm = ({ value, onChange, className }: IProps): ReactElement => {
    const handleClick = (): void => {
        if (onChange) onChange(!value);
    };

    return (
        <Switch
            className={className}
            checked={value}
            onChange={handleClick}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        />
    );
};

export default SwitchSm;
