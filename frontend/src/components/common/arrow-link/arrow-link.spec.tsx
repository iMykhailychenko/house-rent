import { render } from '@testing-library/react';

import ArrowLink from './arrow-link';

describe('Home page', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<ArrowLink href="test">test</ArrowLink>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot with props', () => {
        const { asFragment } = render(
            <ArrowLink href="test" className="test" direction="right">
                test
            </ArrowLink>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
