import React, { ReactElement } from 'react';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { changeInputFilterAction, changePostStatusFilterAction } from '../../../../state/entities/filters/filters.reducer';
import { usePostStatusFiltersSelector, useSearchFiltersSelector } from '../../../../state/entities/filters/filters.selector';
import { ALL_STATUSES } from '../../../../state/entities/posts/posts.interface';
import Button from '../../../common/button/button';
import CardSizeSwitcher from '../../../common/card-size-switcher/card-size-switcher';
import Checkbox from '../../../common/checkbox/checkbox';
import Chips from '../../../common/chips/chips';
import SearchInput from '../../../common/search-input/search-input';

import css from './users-posts-filters.module.scss';

const UsersPostsFilters = (): ReactElement => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const search = useSearchFiltersSelector();
    const statusFilters = usePostStatusFiltersSelector();

    const handleChangeInput = (value: string): void => {
        dispatch(changeInputFilterAction(value));
    };
    const handleChangePrice = (value: string[]): void => {
        if (!value.length) return;
        dispatch(changePostStatusFilterAction(value));
    };
    const toggleSelectAll = (): void => {
        dispatch(changePostStatusFilterAction(ALL_STATUSES));
    };

    return (
        <>
            <CardSizeSwitcher />

            <div className={css.root}>
                <h4 className={css.title}>{trans('Шукати оголошення')}</h4>
                <SearchInput value={search} onChange={handleChangeInput} placeholder="Введіть пошуковий запит" />

                <h4 className={css.title}>{trans('Статус оголошення')}</h4>
                <Chips onChange={handleChangePrice} chips={statusFilters} />
                <Checkbox
                    size="sm"
                    className={css.checkbox}
                    onChange={toggleSelectAll}
                    title={trans('Переглянути усі оголошення')}
                    value={ALL_STATUSES.every(status => statusFilters[status].active)}
                />

                <div className={css.flex}>
                    <Button onClick={console.log} secondary>
                        {trans('Очистити')}
                    </Button>
                    <Button primary>{trans('Пошук')}</Button>
                </div>
            </div>
        </>
    );
};

export default UsersPostsFilters;
