import React, { createContext, useState } from 'react';

type UploadContextType = [file: File | null, setFile: (file: File | null) => void];
export const UploadContext = createContext<UploadContextType>([null, () => undefined]);

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const UploadProvider = ({ children }: IProps): JSX.Element => {
    const [file, setFile] = useState<File | null>(null);

    return <UploadContext.Provider value={[file, setFile]}>{children}</UploadContext.Provider>;
};

export default UploadProvider;
