import { useAppSelector } from '../../../hooks/redux.hook';
import { Pagination } from '../../../interfaces';
import { LoadingStatus } from '../../interfaces/common';
import { IState } from '../../interfaces/root';

import { INotification } from './notifications.interface';

export const useNotificationsCountSelector = (): number =>
    useAppSelector<number>(({ notifications }: IState) => notifications.count);

export const useNotificationsLoadingSelector = (): LoadingStatus =>
    useAppSelector<LoadingStatus>(({ notifications }: IState) => notifications.status);

export const useNotificationsSelector = (): Pagination<INotification> =>
    useAppSelector<Pagination<INotification>>(({ notifications }: IState) => notifications.data);
