import { ReactElement } from 'react';

import RootLayout from '../components/layout/root-layout/root-layout';
import Meta from '../components/meta/meta';
import HomeBanner from '../components/pages/home/home-banner/home-banner';
import HomePosts from '../components/pages/home/home-posts/home-posts';

const HomePage = (): ReactElement => {
    return (
        <RootLayout>
            <Meta />
            <HomeBanner />
            <HomePosts />
        </RootLayout>
    );
};

export default HomePage;
