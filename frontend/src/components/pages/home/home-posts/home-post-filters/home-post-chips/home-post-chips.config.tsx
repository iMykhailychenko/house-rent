import { Fireplace } from '@material-ui/icons';

import { IChipsMap } from '../../../../../common/chips/chips';

const filtersChips: IChipsMap = {
    hot: {
        name: 'hot',
        active: false,
        icon: <Fireplace />,
        hover: '#cf1322',
    },
};

export default filtersChips;
