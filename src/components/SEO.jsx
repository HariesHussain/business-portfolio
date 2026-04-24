import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://harieshussain.me';
const SITE_NAME = 'Haries Hussain Portfolio';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const SEO = ({
    title = 'Haries Hussain | Web Developer & AIML Expert in Mulanpeta, Nandyal',
    description = "Looking for a talented Web Developer or AI/ML intern in Mulanpeta, Nandyal? Haries Hussain is a top AIML engineering student specializing in React, JavaScript, and Machine Learning.",
    path = '/',
    image = DEFAULT_IMAGE,
    type = 'website',
    noindex = false,
    keywords = "Mulanpeta street, Nandyal, Web Developer Mulanpeta, Haries Hussain, AIML Developer, Frontend Developer Nandyal",
    schemaType = "ProfilePage"
}) => {
    const url = `${SITE_URL}${path}`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "mainEntity": {
            "@type": "Person",
            "name": "Haries Hussain Shaik",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Mulanpeta",
                "addressLocality": "Nandyal",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "518501",
                "addressCountry": "IN"
            }
        }
    };

    return (
        <Helmet>
            {/* Primary */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Dynamic Page JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};

export default SEO;
