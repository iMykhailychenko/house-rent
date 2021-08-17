import React, { ReactElement } from 'react';

interface IProps {
    value: boolean;
    onChange?: (value: boolean) => void;
    className?: string;
    width?: number;
}

const SwitchSm = ({ value, onChange }: IProps): ReactElement => {
    console.log({ value, onChange });
    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
            odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
        </div>
    );
};

export default SwitchSm;
