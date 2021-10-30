import React, { Component, MouseEvent, TouchEvent } from 'react';

import { CSSTransition } from 'react-transition-group';

import { EventEmitter } from 'events';

import css from './modal.module.scss';

type Element = JSX.Element[] | JSX.Element | null;

class ModalManagement extends EventEmitter {
    public dom: Element;
    public scrollY = 0;

    constructor() {
        super();
        this.dom = null;
    }

    open = (dom: Element): void => {
        this.dom = dom;

        // styles
        if (process.browser) {
            this.scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${this.scrollY}px`;
        }

        // emit
        this.emitChange();
    };

    close = (): void => {
        if (!this.dom && !this.scrollY) return;

        this.dom = null;

        // styles
        if (process.browser) {
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo({ top: this.scrollY });
            this.scrollY = 0;
        }

        // emit
        this.emitChange();
    };

    emitChange = (): void => {
        this.emit('modal', this.dom);
    };
}

export const modal = new ModalManagement();

interface IState {
    dom: Element;
}

export default class ModalComponent extends Component<unknown, IState> {
    state = {
        dom: null,
    };

    componentDidMount(): void {
        modal.addListener('modal', this.handleModal);
        window.addEventListener('keydown', this.handleKeyClose);
    }

    componentWillUnmount(): void {
        modal.removeListener('modal', this.handleModal);
        window.removeEventListener('keydown', this.handleKeyClose);
    }

    handleModal = (dom: Element): void => {
        this.setState({ dom });
    };

    handleKeyClose = (event: KeyboardEvent): void => {
        if (event.code !== 'Escape') return;
        modal.close();
    };

    handleClickClose = (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
        if (event.target !== event.currentTarget) return;
        modal.close();
    };

    render(): JSX.Element {
        const { dom } = this.state;
        return (
            <CSSTransition timeout={200} unmountOnExit in={!!dom}>
                <div
                    id="backdrop"
                    className={css.backdrop}
                    onMouseDown={this.handleClickClose}
                    onTouchStart={this.handleClickClose}
                    aria-hidden="true"
                >
                    <div
                        id="scroll"
                        className={css.scroll}
                        onMouseDown={this.handleClickClose}
                        onTouchStart={this.handleClickClose}
                        aria-hidden="true"
                    >
                        {dom}
                    </div>
                </div>
            </CSSTransition>
        );
    }
}
