import { ReactElement } from 'react';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined';
import Whatshot from '@mui/icons-material/Whatshot';

const filtersIconsMap: { [key: string]: ReactElement } = {
    hot: <Whatshot />,
    rooms: <WeekendOutlinedIcon />,
    old_house: <MapsHomeWorkOutlinedIcon />,
    new_house: <BusinessOutlinedIcon />,
};

export default filtersIconsMap;
