import { useContext } from 'react';

import { Auth } from '../context/auth/auth.context';
import { IAuthState } from '../state/entities/auth/auth.interface';

const useAuth = (): IAuthState | null => {
    const [value] = useContext(Auth);
    return value;
};

export default useAuth;
