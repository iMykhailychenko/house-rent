import { ReactElement } from 'react';

import HomeBanner from '../components/pages/home/home-banner/home-banner';
import HomePosts from '../components/pages/home/home-posts/home-posts';

const Home = (): ReactElement => {
    return (
        <>
            <HomeBanner />
            <HomePosts />
        </>
    );
};

export default Home;
