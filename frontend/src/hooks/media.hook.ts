import { useContext } from 'react';

import { Media } from '../context/media/media';

const useMaxWidth = (width: number): boolean => {
    const [media] = useContext(Media);
    return width < media;
};

export default useMaxWidth;
