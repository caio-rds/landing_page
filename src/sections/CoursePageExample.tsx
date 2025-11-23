/**
 * 📋 EXEMPLO PRÁTICO: Como usar SEO em uma página de curso individual
 * Este arquivo mostra como implementar SEO em uma página de detalhe de curso
 */

import { useHead, addStructuredData } from '../hooks/useHead';
import { generateCourseSchema } from '../utils/seoConfig';
import { SEO_CONFIG } from '../utils/seoConfig';

interface CoursePageProps {
  courseId: string;
}

export default function CoursePage({ courseId }: CoursePageProps) {
  // Dados do curso (normalmente viriam de uma API)
  const course = {
    id: courseId,
    title: 'Cirurgia Veterinária Avançada',
    subtitle: 'Aprenda técnicas avançadas de cirurgia em pequenos animais',
    description: 'Curso completo com 30 horas de conteúdo sobre técnicas cirúrgicas avançadas, incluindo videoaulas, materiais complementares e certificado.',
    image: 'https://cursos.vet/courses/cirurgia-avancada.png',
    instructor: 'Dr. João Silva',
    duration: 'PT30H',
    level: 'Advanced',
    rating: 4.8,
    reviewCount: 125,
    price: 299.90,
    slug: 'cirurgia-veterinaria-avancada'
  };

  const courseUrl = `${SEO_CONFIG.site.url}/cursos/${course.slug}`;

  // 1️⃣ Atualizar meta tags da página
  useHead({
    title: `${course.title} | Cursos.vet`,
    description: course.subtitle,
    keywords: `${course.title}, cirurgia veterinária, educação continuada, ${course.instructor}`,
    ogTitle: course.title,
    ogDescription: course.subtitle,
    ogImage: course.image,
    ogUrl: courseUrl,
    twitterCard: 'summary_large_image',
    canonical: courseUrl,
    robots: SEO_CONFIG.robots.default,
    author: SEO_CONFIG.site.author,
  });

  // 2️⃣ Adicionar schema.org para o curso
  const courseSchema = generateCourseSchema({
    name: course.title,
    description: course.description,
    image: course.image,
    instructor: course.instructor,
    duration: course.duration,
    level: course.level,
    rating: course.rating,
    reviewCount: course.reviewCount,
    price: course.price,
    url: courseUrl,
  });

  addStructuredData(courseSchema);

  // 3️⃣ Adicionar breadcrumb structured data
  addStructuredData({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SEO_CONFIG.site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cursos',
        item: `${SEO_CONFIG.site.url}/cursos`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: courseUrl,
      },
    ],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <img src={course.image} alt={course.title} className="w-full h-96 object-cover rounded-lg" />
      </div>

      {/* Course Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{course.subtitle}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-400">★</span>
          <span className="font-bold">{course.rating}</span>
          <span className="text-gray-600">({course.reviewCount} avaliações)</span>
        </div>

        {/* Instructor */}
        <p className="text-lg mb-4">
          <strong>Instrutor:</strong> {course.instructor}
        </p>

        {/* Meta Info */}
        <div className="flex gap-6 text-gray-600 mb-6">
          <span>⏱️ Duração: {course.duration}</span>
          <span>📚 Nível: {course.level}</span>
          <span className="text-2xl font-bold text-green-600">R$ {course.price.toFixed(2)}</span>
        </div>

        {/* CTA Button */}
        <button className="bg-[#598E71] text-white px-8 py-3 rounded-lg text-lg font-bold hover:opacity-90">
          Matricular-se agora
        </button>
      </header>

      {/* Course Content */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Sobre este curso</h2>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </section>

      {/* Programa do Curso */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Programa do Curso</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Introdução às técnicas cirúrgicas avançadas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Anestesia e recuperação pós-operatória</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Cirurgias abdominais complexas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Cirurgias torácicas e ortopédicas</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Complicações cirúrgicas e manejo</span>
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
        <details className="mb-4 p-4 border rounded-lg">
          <summary className="font-bold cursor-pointer">Este curso oferece certificado?</summary>
          <p className="mt-2 text-gray-700">Sim! Ao completar o curso você recebirá um certificado digital.</p>
        </details>
        <details className="mb-4 p-4 border rounded-lg">
          <summary className="font-bold cursor-pointer">Posso assistir às aulas em qualquer momento?</summary>
          <p className="mt-2 text-gray-700">Sim! Todas as aulas ficam disponíveis para você assistir quantas vezes quiser.</p>
        </details>
      </section>
    </div>
  );
}

/**
 * 💡 DICAS DE USO:
 * 
 * 1. Meta Tags: Automaticamente atualizadas quando o componente renderiza
 * 2. Structured Data: Adicionado ao <head> para Google entender o conteúdo
 * 3. Breadcrumb: Ajuda na navegação e SEO
 * 4. Social Media: Imagens aparecem quando compartilhado no Facebook, Twitter, LinkedIn
 * 
 * 🔍 COMO TESTAR:
 * 
 * 1. Google Rich Results Test: https://search.google.com/test/rich-results
 *    - Cole a URL da página e veja se o schema foi detectado
 * 
 * 2. Meta Tags Checker: https://metatags.io/
 *    - Veja como a página aparece quando compartilhada
 * 
 * 3. Inspect das DevTools:
 *    - F12 > Inspecione o <head>
 *    - Veja se os meta tags estão lá
 * 
 * 4. Google Search Console:
 *    - Verifique se a página foi indexada
 *    - Veja se há erros de schema
 */
