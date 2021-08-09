import { useContext } from 'react';

import { Auth } from '../context/auth/auth.context';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';

const useAuth = (): IAuthInitialState | null => {
    const [value] = useContext(Auth);
    return value;
};

export default useAuth;
