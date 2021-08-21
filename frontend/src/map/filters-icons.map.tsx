import { ReactElement } from 'react';

import { Apartment, HomeWork, Weekend, Whatshot } from '@material-ui/icons';

const filtersIconsMap: { [key: string]: ReactElement } = {
    hot: <Whatshot />,
    rooms: <Weekend />,
    old_house: <HomeWork />,
    new_house: <Apartment />,
};

export default filtersIconsMap;
