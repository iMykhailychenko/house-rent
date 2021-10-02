import { useCallback } from 'react';

import { Params } from 'next/dist/next-server/server/router';
import queryString from 'query-string';

type ShallowRouter = (query: Params) => void;

const useShallowRouter = (): ShallowRouter => {
    return useCallback((query: Params): void => {
        const value = queryString.stringify(query, { skipNull: true });
        const url = location.pathname + (value ? '?' + value : value);
        window.history.pushState({}, window.location.origin, url);
    }, []);
};

export default useShallowRouter;
