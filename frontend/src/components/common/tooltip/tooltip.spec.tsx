import { render } from '../../../tests/tests.utils';

import Tooltip from './tooltip';

describe('Tooltip component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(
            <Tooltip className="test" content="test">
                <p>test</p>
            </Tooltip>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('render content', () => {
        const { queryByText } = render(
            <Tooltip content={<p>test content</p>}>
                <p>test</p>
            </Tooltip>,
        );
        expect(queryByText('test content')).toBeTruthy();
    });

    it('hidden', () => {
        const { queryByText } = render(
            <Tooltip content={<p>test content</p>} hidden>
                <p>test</p>
            </Tooltip>,
        );
        expect(queryByText('test content')).toBeFalsy();
    });
});
