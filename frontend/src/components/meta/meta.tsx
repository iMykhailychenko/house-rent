import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import env from '../../config/env.config';
import useTrans from '../../hooks/trans.hook';

import css from './meta.module.scss';

interface IProps {
    title?: string;
    description?: string;
    keywords?: string;
    icon?: string | null;
    h1?: string;
}

const siteName = 'House Rent';
const host = env.host || 'http://localhost:3000';

const Meta = ({ title, description, keywords = '', icon, h1 = '' }: IProps): JSX.Element => {
    const trans = useTrans();
    const history = useRouter();

    const url = (lang = 'ua'): string => (lang === 'ua' ? host : host + '/' + lang);

    return (
        <>
            <Head>
                {/*Primary meta Tags*/}
                <title>{title?.trim() ? `${title} | ${siteName}` : siteName}</title>
                <meta name="title" content={title?.trim() ? `${title} | ${siteName}` : siteName} />
                <meta name="description" content={description || trans('site_desc')} />

                {/*Internal meta Tags*/}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <meta name="keywords" content={`${trans('keywords')} ${keywords}`} />
                <meta name="robots" content="index,follow" />

                {/*Open Graph / Facebook*/}
                <meta property="og:url" content={url(history.locale)} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title?.trim() ? `${title} | ${siteName}` : siteName} />
                <meta property="og:description" content={description || trans('site_desc')} />
                <meta property="og:image" content={icon || `${url()}/about.jpg`} />
                <meta property="og:site_name" content={siteName} />

                {/*Twitter*/}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={url(history.locale)} />
                <meta property="twitter:title" content={title?.trim() ? `${title} | ${siteName}` : siteName} />
                <meta property="twitter:description" content={description || trans('site_desc')} />
                <meta property="twitter:image" content={icon || `${url()}/about.jpg`} />

                {/* PWA */}
                <meta name="application-name" content={siteName} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={title?.trim() ? `${title} | ${siteName}` : siteName} />
                <meta name="description" content={description || trans('site_desc')} />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-tap-highlight" content="yes" />
            </Head>
            <h1 className={css.title}>{h1 ? h1 + '. ' + trans('site_desc') : trans('site_desc')}</h1>
        </>
    );
};

export default Meta;
