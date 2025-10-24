'use client';
import React from 'react';

type Props = {
  title?: string;
  description?: string;
  jsonLd?: object;
  ogImage?: string;
};

export default function Seo({ title, description, jsonLd, ogImage }: Props){
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {ogImage && (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </>
  );
}
