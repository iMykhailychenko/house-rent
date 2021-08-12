import { Apartment, HomeWork, Weekend, Whatshot } from '@material-ui/icons';
import { ReactElement } from 'react';

const filtersIconsMap: { [key: string]: ReactElement } = {
    hot: <Whatshot />,
    rooms: <Weekend />,
    old_house: <HomeWork />,
    new_house: <Apartment />,
};

export default filtersIconsMap;
