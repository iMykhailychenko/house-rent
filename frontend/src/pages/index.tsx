import { ReactElement } from 'react';

import Meta from '../components/meta/meta';
import HomeBanner from '../components/pages/home/home-banner/home-banner';
import HomePosts from '../components/pages/home/home-posts/home-posts';

const Home = (): ReactElement => {
    return (
        <>
            <Meta />
            <HomeBanner />
            <HomePosts />
        </>
    );
};

export default Home;
