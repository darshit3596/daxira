import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
}

const DEFAULT_TITLE = 'Daxira InfoTech — Custom Websites & Web Development in Gujarat, India';
const DEFAULT_DESCRIPTION = 'Fast, mobile-friendly websites, online stores, and custom software for businesses in Gujarat, Ahmedabad, and worldwide. Work directly with developer Darshit Sapariya with fixed pricing from ₹4,000.';
const BASE_URL = 'https://daxirainfo.site';
const DEFAULT_OG_IMAGE = 'https://daxirainfo.site/og-image.svg';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  noindex = false,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    const finalTitle = title
      ? title.includes('Daxira')
        ? title
        : `${title} | Daxira InfoTech`
      : DEFAULT_TITLE;
    document.title = finalTitle;

    // 2. Compute canonical URL
    const pathname = location.pathname === '/' ? '' : location.pathname.replace(/\/+$/, '');
    const finalCanonical = canonicalUrl || `${BASE_URL}${pathname}`;

    // Helper to create or update meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper for link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Canonical Tag
    setLinkTag('canonical', finalCanonical);

    // Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalCanonical);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Daxira InfoTech');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

    // Twitter / X Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
  }, [title, description, canonicalUrl, noindex, ogType, ogImage, location.pathname]);

  return null;
};
