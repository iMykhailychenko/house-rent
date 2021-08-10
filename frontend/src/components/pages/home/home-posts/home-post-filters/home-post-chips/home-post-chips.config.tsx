import { KingBed, Weekend, Whatshot } from '@material-ui/icons';

import { IChipsMap } from '../../../../../common/chips/chips';

const filtersChips: IChipsMap = {
    hot: {
        name: 'hot',
        active: true,
        icon: <Whatshot />,
        hover: '#cf1322',
    },
    oneRoom: {
        name: 'oneRoom',
        active: false,
        icon: <Weekend />,
    },
    twoRooms: {
        name: 'twoRooms',
        active: false,
        icon: <KingBed />,
    },
    moreRooms: {
        name: 'moreRooms',
        active: false,
        icon: <KingBed />,
        hover: '#28bf65',
    },
};

export default filtersChips;
