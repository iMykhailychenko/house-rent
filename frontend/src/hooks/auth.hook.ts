import { useContext } from 'react';

import { Auth, AuthHook } from '../context/auth/auth';

const useAuth = (): AuthHook => useContext(Auth);

export default useAuth;
