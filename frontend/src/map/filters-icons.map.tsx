import { ReactElement } from 'react';

import Apartment from '@material-ui/icons/Apartment';
import HomeWork from '@material-ui/icons/HomeWork';
import Weekend from '@material-ui/icons/Weekend';
import Whatshot from '@material-ui/icons/Whatshot';

const filtersIconsMap: { [key: string]: ReactElement } = {
    hot: <Whatshot />,
    rooms: <Weekend />,
    old_house: <HomeWork />,
    new_house: <Apartment />,
};

export default filtersIconsMap;
