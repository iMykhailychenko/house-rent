import React, { ReactElement } from 'react';

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

const color = '#0492ff';
const siteName = 'House Rent';
const host = env.host || 'http://localhost:3000';

const Meta = ({ title, description, keywords = '', icon, h1 = '' }: IProps): ReactElement => {
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

                <meta name="parsely-link" content={url(history.locale)} />

                <meta name="theme-color" content={color} />
                <link href="/manifest.json" rel="manifest" />
                <link href={icon || `${url()}/meta/icons/mask-icon.png`} rel="icon" type="image/png" />
                <link href="/meta/icons/icon-72.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/meta/icons/icon-72.png" rel="icon" type="image/png" sizes="32x32" />
                <link href="/meta/icons/icon-72.png" rel="icon" type="image/png" sizes="72x72" />
                <link href="/meta/icons/icon-96.png" rel="icon" type="image/png" sizes="96x96" />
                <link href="/meta/icons/icon-128.png" rel="icon" type="image/png" sizes="128x128" />
                <link href="/meta/icons/icon-144.png" rel="icon" type="image/png" sizes="144x144" />
                <link href="/meta/icons/icon-152.png" rel="icon" type="image/png" sizes="152x152" />
                <link href="/meta/icons/icon-192.png" rel="icon" type="image/png" sizes="192x192" />
                <link href="/meta/icons/icon-384.png" rel="icon" type="image/png" sizes="384x384" />
                <link href="/meta/icons/icon-512.png" rel="icon" type="image/png" sizes="512x512" />

                <link href="/meta/icons/mask-icon.png" rel="apple-touch-icon" />
                <link href="/meta/icons/icon-72.png" rel="apple-touch-icon" type="image/png" sizes="16x16" />
                <link href="/meta/icons/icon-72.png" rel="apple-touch-icon" type="image/png" sizes="32x32" />
                <link href="/meta/icons/icon-72.png" rel="apple-touch-icon" type="image/png" sizes="72x72" />
                <link href="/meta/icons/icon-96.png" rel="apple-touch-icon" type="image/png" sizes="96x96" />
                <link href="/meta/icons/icon-128.png" rel="apple-touch-icon" type="image/png" sizes="128x128" />
                <link href="/meta/icons/icon-144.png" rel="apple-touch-icon" type="image/png" sizes="144x144" />
                <link href="/meta/icons/icon-152.png" rel="apple-touch-icon" type="image/png" sizes="152x152" />
                <link href="/meta/icons/icon-192.png" rel="apple-touch-icon" type="image/png" sizes="192x192" />
                <link href="/meta/icons/icon-384.png" rel="apple-touch-icon" type="image/png" sizes="384x384" />
                <link href="/meta/icons/icon-512.png" rel="apple-touch-icon" type="image/png" sizes="512x512" />

                <link rel="mask-icon" href="/meta/icons/mask-icon.png" color={color} />
                <link rel="canonical" href={url(history.locale)} />
                <link rel="alternate" hrefLang="x-default" href={url()} />
                <link rel="alternate" hrefLang="en" href={url('pl')} />
                <link rel="alternate" hrefLang="ru" href={url('ru')} />
                <link rel="alternate" hrefLang="ua" href={url('ua')} />

                {/* PWA */}
                <meta name="application-name" content={siteName} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={title?.trim() ? `${title} | ${siteName}` : siteName} />
                <meta name="description" content={description || trans('site_desc')} />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content={color} />
                <meta name="msapplication-tap-highlight" content="yes" />
            </Head>
            <h1 className={css.title}>{h1 ? h1 + '. ' + trans('site_desc') : trans('site_desc')}</h1>
        </>
    );
};

export default Meta;
