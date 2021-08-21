import { render } from '@testing-library/react';

import Link from './link';

describe('Link component', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Link href="/test">test</Link>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot props', () => {
        const { asFragment } = render(
            <Link className="test" href="/test" primary title="test">
                test
            </Link>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
