import { EventEmitter } from 'events';

import { shallowRouter } from './shallow-router.helper';

interface IPaginationEmitter {
    update: (page: number) => void;
    subscribe: (callback: () => void) => void;
    unsubscribe: (callback: () => void) => void;
}

class PaginationEmitter extends EventEmitter implements IPaginationEmitter {
    constructor() {
        super();
    }

    update = (page: number): void => {
        shallowRouter({ page });
        this.emit('pagination', page);
    };

    subscribe = (callback: (page: number) => void): void => {
        this.on('pagination', callback);
    };

    unsubscribe = (callback: (page: number) => void): void => {
        this.off('pagination', callback);
    };
}

export const paginationEmitter = new PaginationEmitter();
