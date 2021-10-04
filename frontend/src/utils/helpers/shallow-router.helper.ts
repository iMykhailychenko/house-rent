import queryString from 'query-string';

import { Params } from '../../interfaces';

export const shallowRouter = (query: Params): void => {
    if (process.browser) {
        const value = queryString.stringify(query, { skipNull: true });
        const prefix = location.pathname[location.pathname.length - 1] === '/' ? '?' : '/?';
        const url = location.pathname + prefix + value;
        window.history.pushState({}, window.location.origin, url);
    }
};
