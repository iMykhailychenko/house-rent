import Home from '../../../pages';
import { render } from '../../tests.utils';

describe('Home page', () => {
    it('matches snapshot', () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    });
});
