import React, { ReactElement } from 'react';

import useConfig from '../../../../hooks/config.hook';
import useTrans from '../../../../hooks/trans.hook';
import CardSizeSwitcher from '../../../common/card-size-switcher/card-size-switcher';
import PostCard from '../../../common/post-card/post-card';
import Container from '../../../layout/container/container';
import Section from '../../../layout/section/section';
import HomePostFilters from './home-post-filters/home-post-filters';
import css from './home-posts.module.scss';

const mock = [0, 1, 2, 3, 4, 5, 6];

const HomePosts = (): ReactElement => {
    const trans = useTrans();
    const [config] = useConfig();

    return (
        <Section>
            <Container size="lg">
                <div className={css.root}>
                    <Container size="sm">
                        <h2 className="title-2">
                            {trans(
                                'Якщо ви рієлтори чи власник квартири, то в першу чергу зверніть увагу на термінові оголошення',
                            )}
                        </h2>
                    </Container>

                    <div className={css.flex}>
                        <div className={css[config.cardSize]}>
                            {mock.map(item => (
                                <PostCard key={item} />
                            ))}
                        </div>
                        <HomePostFilters />
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default HomePosts;
