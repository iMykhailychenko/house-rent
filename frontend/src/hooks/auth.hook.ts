import { useContext } from 'react';

import { Auth, AuthHook } from '../context/auth/auth.context';

const useAuth = (): AuthHook => useContext(Auth);

export default useAuth;
