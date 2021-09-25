import React, { ReactElement } from 'react';

import { ChildFriendly, People, Pets } from '@material-ui/icons';

import { useSinglePostSelector } from '../../../../state/entities/posts/posts.selector';
import { formatDate } from '../../../../utils/helpers';
import FullScreenImg from '../../../common/full-screen-img/full-screen-img';
import NotFoundPost from '../../../common/not-found/not-found-post/not-found-post';
import PostCardFooter from '../../../common/post-card/post-card-footer/post-card-footer';
import Socials from '../../../common/share-links/share-links';
import Container from '../../../layout/container/container';

import css from './single.module.scss';

const SinglePostComponent = (): ReactElement => {
    const postState = useSinglePostSelector();
    const postData = postState.data;

    return (
        <NotFoundPost error={!postData.id}>
            <>
                <Container size="md">
                    <>
                        {postData.image && (
                            <div className={css.img}>
                                <FullScreenImg className={css.imgTag} src={postData.image} alt={postData.title} />
                            </div>
                        )}
                    </>
                </Container>
                <Container size="sm">
                    <>
                        <div className={css.header}>
                            <div className={css.inner}>
                                <p className={css.small}>Поділитись цим постом:</p>
                                <Socials title={postData.title} />
                            </div>

                            <div className={css.inner}>
                                <p className={css.small}>Створено:</p>
                                <p className={css.date}>{formatDate(postData.creationDate)}</p>
                            </div>
                        </div>

                        <div className={css.wrap}>
                            <h2 className={css.title}>{postData.title}</h2>
                            <p className={css.text} dangerouslySetInnerHTML={{ __html: postData.description }} />
                        </div>

                        <PostCardFooter size="sm" post={postData} />

                        <div className={css.wrap}>
                            <h3 className={css.subtitle}>{'about_author'}</h3>
                            <table className={css.table}>
                                <tbody>
                                    <tr>
                                        <td className={css.left}>residentsAmount</td>
                                        <td>
                                            <div className={css.rowWithIcon}>
                                                <div className={css.svg}>
                                                    <People />
                                                </div>
                                                <span>{postData.residentsAmount}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={css.left}>children</td>
                                        <td>
                                            <div className={css.rowWithIcon}>
                                                <div className={css.svg}>
                                                    <ChildFriendly />
                                                </div>
                                                <span>{postData.children || '-'}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={css.left}>pets</td>
                                        <td>
                                            <div className={css.rowWithIcon}>
                                                <div className={css.svg}>
                                                    <Pets />
                                                </div>
                                                <span>{postData.pets || '-'}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={css.wrap}>
                            <h3 className={css.subtitle}>{'about_flat'}</h3>
                            <table className={css.table}>
                                <tbody>
                                    <tr>
                                        <td className={css.left}>houseTypeFilters</td>
                                        <td>{postData.houseTypeFilters.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td className={css.left}>roomFilters</td>
                                        <td>{postData.roomFilters.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td className={css.left}>priceFilters</td>
                                        <td>{postData.priceFilters.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td className={css.left}>cityFilters</td>
                                        <td>{postData.cityFilters}</td>
                                    </tr>
                                    <tr>
                                        <td className={css.left}>priceFilters</td>
                                        <td>{postData.districtFilters.join(', ')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                </Container>
            </>
        </NotFoundPost>
    );
};

export default SinglePostComponent;
