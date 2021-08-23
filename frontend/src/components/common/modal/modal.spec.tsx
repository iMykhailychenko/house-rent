import { fireEvent, render } from '@testing-library/react';

import ModalComponent, { modal } from './modal';

describe('Modal component', () => {
    it('Modal should be opened', () => {
        const { getByText } = render(<ModalComponent />);
        modal.open(<p>open modal</p>);
        expect(getByText('open modal')).toBeInTheDocument();
    });

    it('Modal should be closed', () => {
        const { getByText, queryByText } = render(<ModalComponent />);
        modal.open(<p>open modal</p>);
        expect(getByText('open modal')).toBeInTheDocument();
        modal.close();
        expect(queryByText('open modal')).not.toBeInTheDocument();
    });

    it('Close modal by Escape key', () => {
        const { getByText, queryByText } = render(<ModalComponent />);
        modal.open(<p>open modal</p>);
        expect(getByText('open modal')).toBeInTheDocument();

        fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
        expect(queryByText('open modal')).not.toBeInTheDocument();
    });

    it('Dont close modal by inner click', () => {
        const { getByText } = render(<ModalComponent />);
        modal.open(<p>open modal</p>);
        expect(getByText('open modal')).toBeInTheDocument();

        fireEvent.click(getByText('open modal'));
        expect(getByText('open modal')).toBeInTheDocument();
    });

    it('Close modal by backdrop click', () => {
        const { getByText, queryByText, container } = render(<ModalComponent />);
        modal.open(<p data-testid="test">open modal</p>);
        expect(getByText('open modal')).toBeInTheDocument();
        expect(container.querySelector('#backdrop')).toBeInTheDocument();

        fireEvent.touchStart(container.querySelector('#backdrop') || new Element());
        expect(queryByText('open modal')).not.toBeInTheDocument();
    });

    it('Close modal by scroll element click', () => {
        const { getByText, queryByText, container } = render(<ModalComponent />);
        modal.open(<p data-testid="test">open modal</p>);
        expect(getByText('open modal')).toBeInTheDocument();

        expect(container.querySelector('#scroll')).toBeInTheDocument();

        fireEvent.touchStart(container.querySelector('#scroll') || new Element());
        expect(queryByText('open modal')).not.toBeInTheDocument();
    });
});
