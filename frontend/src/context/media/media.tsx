import React, { createContext, ReactElement, useEffect, useState } from 'react';

export const Media = createContext<[media: number, setMedia: ((value: number) => void) | null]>([768, null]);

interface IProps {
    width?: number;
    children: ReactElement[] | ReactElement;
}

const MediaProvider = ({ children, width = 768 }: IProps): ReactElement => {
    const [media, setMedia] = useState<number>(width);

    useEffect(() => {
        if (process.browser) {
            setMedia(window.innerWidth);

            const handleResize = (): void => {
                setMedia(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return <Media.Provider value={[media, setMedia]}>{children}</Media.Provider>;
};

export default MediaProvider;
