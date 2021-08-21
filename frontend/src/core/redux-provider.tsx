import { ReactElement } from 'react';

import { Provider } from 'react-redux';

import { useStore } from '../state/store';

interface IProps {
    children: ReactElement;
}

const ReduxProvider = ({ children }: IProps): ReactElement => <Provider store={useStore()}>{children}</Provider>;

export default ReduxProvider;
