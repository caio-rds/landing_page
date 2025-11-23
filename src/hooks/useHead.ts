import { useEffect } from 'react';

interface HeadConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  canonical?: string;
  robots?: string;
  author?: string;
}

/**
 * Hook para gerenciar meta tags e configurações SEO dinamicamente
 * @param config - Configuração de meta tags
 */
export const useHead = (config: HeadConfig) => {
  useEffect(() => {
    // Atualizar título
    if (config.title) {
      document.title = config.title;
      updateMetaTag('og:title', config.ogTitle || config.title);
      updateMetaTag('twitter:title', config.ogTitle || config.title);
    }

    // Atualizar descrição
    if (config.description) {
      updateMetaTag('description', config.description);
      updateMetaTag('og:description', config.ogDescription || config.description);
      updateMetaTag('twitter:description', config.ogDescription || config.description);
    }

    // Atualizar palavras-chave
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    // Atualizar Open Graph
    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage);
      updateMetaTag('twitter:image', config.ogImage);
    }

    if (config.ogUrl) {
      updateMetaTag('og:url', config.ogUrl);
      updateMetaTag('twitter:url', config.ogUrl);
    }

    if (config.twitterCard) {
      updateMetaTag('twitter:card', config.twitterCard);
    }

    // Atualizar canônico
    if (config.canonical) {
      updateCanonical(config.canonical);
    }

    // Atualizar robots
    if (config.robots) {
      updateMetaTag('robots', config.robots);
    }

    // Atualizar author
    if (config.author) {
      updateMetaTag('author', config.author);
    }

    // Scroll para o topo
    window.scrollTo(0, 0);
  }, [config]);
};

/**
 * Atualiza ou cria uma meta tag
 */
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[name="${name}"], meta[property="${name}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    const isProperty = name.includes(':');
    if (isProperty) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.content = content;
}

/**
 * Atualiza o link canônico
 */
function updateCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = href;
}

/**
 * Adiciona Schema.org Structured Data
 */
export const addStructuredData = (data: Record<string, any>) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * Configurações padrão de SEO
 */
export const defaultSEOConfig = {
  title: 'Cursos.vet - Educação Continuada em Medicina Veterinária',
  description: 'Plataforma de educação continuada em medicina veterinária. Acesse cursos especializados e materiais educacionais para veterinários.',
  keywords: 'veterinária, educação continuada, cursos veterinários, medicina veterinária',
  author: 'Cursos.vet',
  ogImage: 'https://cursos.vet/og-image.png',
  robots: 'index, follow, max-image-preview:large',
};
