import type { ReactNode } from 'react';
import { useHead } from '../hooks/useHead';
import { addStructuredData } from '../hooks/useHead';

interface SEOPageProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url: string;
  canonical?: string;
  robots?: string;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

/**
 * Componente wrapper para gerenciar SEO de páginas
 */
export const SEOPage = ({
  children,
  title,
  description,
  keywords,
  image,
  url,
  canonical,
  robots,
  structuredData,
  noindex = false,
}: SEOPageProps) => {
  useHead({
    title,
    description,
    keywords,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    canonical: canonical || url,
    robots: noindex ? 'noindex, nofollow' : robots,
  });

  if (structuredData) {
    addStructuredData(structuredData);
  }

  return <>{children}</>;
};

export default SEOPage;
