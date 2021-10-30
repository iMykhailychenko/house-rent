import React from 'react';

interface IProps {
    children: JSX.Element;
}

const PrivateLayout = ({ children }: IProps): JSX.Element => {
    return <div>{children}</div>;
};

export default PrivateLayout;
