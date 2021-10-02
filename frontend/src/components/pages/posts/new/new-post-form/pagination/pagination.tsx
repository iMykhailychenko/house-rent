import React, { ReactElement, useEffect, useState } from 'react';

import { NavigateNext, Sync } from '@material-ui/icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import useShallowRouter from '../../../../../../hooks/shallow-router.hook';
import useTrans from '../../../../../../hooks/trans.hook';
import Button from '../../../../../common/button/button';

import css from './pagination.module.scss';

interface IProps {
    className?: string;
    loading: boolean;
    total: number;
    onPage: (page: number) => void;
    onMore: (page: number) => void;
}

const Pagination = ({ className, loading, total, onPage, onMore }: IProps): ReactElement => {
    const trans = useTrans();
    const history = useRouter();
    const shallow = useShallowRouter();
    const init = +(history.query?.page || 1);
    const [page, setPage] = useState<number>(init < total ? init : total);

    useEffect(() => {
        setPage(+String(history.query?.page || 1));
    }, [history.query]);

    const pushRouter = (page: number) => {
        setPage(page);
        shallow({ ...history.query, page });
    };

    const handlePagination = ({ selected }: { selected: number }): void => {
        pushRouter(selected + 1);
        onPage(selected + 1);
    };

    const handleMore = (): void => {
        pushRouter(page < total ? page + 1 : total);
        onMore(page < total ? page + 1 : total);
    };

    return (
        <div className={clsx(className)}>
            {total > 1 && (
                <>
                    <ReactPaginate
                        previousLabel={<NavigateNext />}
                        nextLabel={<NavigateNext />}
                        breakLabel="..."
                        forcePage={page - 1}
                        pageCount={total}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={1}
                        onPageChange={handlePagination}
                        containerClassName={css.pagination}
                        breakLinkClassName={css.page}
                        pageLinkClassName={css.page}
                        activeLinkClassName={css.active}
                        previousLinkClassName={css.prev}
                        nextLinkClassName={css.next}
                        disabledClassName={css.disabled}
                    />
                    {page < total ? (
                        <Button secondary className={css.more} onClick={handleMore} loading={loading}>
                            <Sync />
                            <span>{trans('load_more')}</span>
                        </Button>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default Pagination;
