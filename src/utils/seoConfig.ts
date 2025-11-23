/**
 * Configuração centralizada de SEO para a aplicação
 */

export const SEO_CONFIG = {
  // Informações Gerais
  site: {
    name: 'Cursos.vet',
    fullName: 'Cursos.vet - Educação Continuada em Medicina Veterinária',
    description: 'Plataforma de educação continuada em medicina veterinária. Acesse cursos especializados, atualizações científicas e materiais educacionais para veterinários.',
    url: 'https://cursos.vet',
    language: 'pt-BR',
    author: 'Cursos.vet',
    email: 'contato@cursos.vet',
    phone: '+55 (11) 0000-0000', // Atualize com o número real
    theme: '#598E71',
  },

  // Imagens para Social Media
  images: {
    og: 'https://cursos.vet/og-image.png',
    twitter: 'https://cursos.vet/twitter-image.png',
    apple: 'https://cursos.vet/apple-touch-icon.png',
  },

  // Redes Sociais
  social: {
    facebook: 'https://facebook.com/cursos.vet',
    twitter: 'https://twitter.com/cursos.vet',
    instagram: 'https://instagram.com/cursos.vet',
    youtube: 'https://youtube.com/@cursos.vet',
    linkedin: 'https://linkedin.com/company/cursos-vet',
  },

  // Palavras-chave por seção
  keywords: {
    home: 'veterinária, educação continuada, cursos veterinários, medicina veterinária, especialização',
    courses: 'cursos de veterinária, educação em veterinária, certificação veterinária, aprendizado',
    about: 'sobre cursos.vet, missão, visão, valores',
    contact: 'contato cursos.vet, suporte, atendimento',
    blog: 'artigos veterinários, dicas, notícias, educação',
  },

  // Configuração de Robots
  robots: {
    default: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    noIndex: 'noindex, nofollow',
    noFollow: 'index, nofollow',
  },

  // OpenGraph padrão
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
  },

  // Twitter Card padrão
  twitter: {
    card: 'summary_large_image',
    creator: '@cursos.vet',
  },

  // Google verificação (adicione o código real do seu Google Search Console)
  google: {
    siteVerification: 'GOOGLE_VERIFICATION_CODE_HERE',
    analyticsId: 'G-XXXXXXXXXX', // Seu Google Analytics ID
  },

  // Estrutura de dados recomendadas
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Cursos.vet',
      url: 'https://cursos.vet',
      logo: 'https://cursos.vet/logo.png',
      description: 'Plataforma de educação continuada em medicina veterinária',
      foundingDate: '2024',
      areaServed: 'BR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://cursos.vet/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },

    courseList: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [], // Será preenchido dinamicamente
    },

    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [], // Será preenchido dinamicamente
    },
  },
};

/**
 * Obter configuração SEO por página
 */
export const getPageSEO = (pageName: string) => {
  const pages: Record<string, any> = {
    home: {
      title: SEO_CONFIG.site.fullName,
      description: SEO_CONFIG.site.description,
      keywords: SEO_CONFIG.keywords.home,
      robots: SEO_CONFIG.robots.default,
      canonical: SEO_CONFIG.site.url,
    },
    courses: {
      title: 'Cursos | Cursos.vet',
      description: 'Explore nossos cursos de educação continuada em medicina veterinária.',
      keywords: SEO_CONFIG.keywords.courses,
      robots: SEO_CONFIG.robots.default,
      canonical: `${SEO_CONFIG.site.url}/cursos`,
    },
    about: {
      title: 'Sobre | Cursos.vet',
      description: 'Conheça a história, missão e valores da Cursos.vet.',
      keywords: SEO_CONFIG.keywords.about,
      robots: SEO_CONFIG.robots.default,
      canonical: `${SEO_CONFIG.site.url}/sobre`,
    },
    contact: {
      title: 'Contato | Cursos.vet',
      description: 'Entre em contato conosco para dúvidas ou sugestões.',
      keywords: SEO_CONFIG.keywords.contact,
      robots: SEO_CONFIG.robots.default,
      canonical: `${SEO_CONFIG.site.url}/contato`,
    },
    blog: {
      title: 'Blog | Cursos.vet',
      description: 'Leia artigos, dicas e notícias sobre educação continuada em veterinária.',
      keywords: SEO_CONFIG.keywords.blog,
      robots: SEO_CONFIG.robots.default,
      canonical: `${SEO_CONFIG.site.url}/blog`,
    },
  };

  return pages[pageName] || pages.home;
};

/**
 * Gerar breadcrumb structured data
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    ...SEO_CONFIG.structuredData.breadcrumb,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Gerar course schema para cursos individuais
 */
export const generateCourseSchema = (courseData: {
  name: string;
  description: string;
  image: string;
  instructor?: string;
  duration?: string;
  level?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  url: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseData.name,
    description: courseData.description,
    image: courseData.image,
    instructor: courseData.instructor ? {
      '@type': 'Person',
      name: courseData.instructor,
    } : undefined,
    duration: courseData.duration,
    educationLevel: courseData.level || 'Intermediate',
    aggregateRating: courseData.rating ? {
      '@type': 'AggregateRating',
      ratingValue: courseData.rating,
      reviewCount: courseData.reviewCount || 0,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: courseData.price || 0,
      priceCurrency: 'BRL',
      url: courseData.url,
    },
    url: courseData.url,
  };
};
