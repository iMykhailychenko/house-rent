import { EventEmitter } from 'events';

import { shallowRouter } from './shallow-router.helper';

interface IPaginationEmitter {
    update: (page: number) => void;
    onPaginate: (callback: () => void) => void;
}

class PaginationEmitter extends EventEmitter implements IPaginationEmitter {
    constructor() {
        super();
    }

    update = (page: number): void => {
        shallowRouter({ page });
        this.emit('pagination', page);
    };

    onPaginate = (callback: (page: number) => void): void => {
        this.on('pagination', callback);
    };
}

export const paginationEmitter = new PaginationEmitter();
