import { CheckCircle2, Award, Video, Users, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesSection({ darkMode }: { darkMode: boolean }) {
  const features = [
    {
      icon: Video,
      title: 'Aulas 100% Práticas',
      description: 'Conteúdo objetivo focado em casos reais e aplicação imediata no dia a dia clínico'
    },
    {
      icon: Award,
      title: 'Certificado Reconhecido',
      description: 'Certificação válida nacionalmente e autorizada pelo CFMV para educação continuada'
    },
    {
      icon: Users,
      title: 'Especialistas Renomados',
      description: 'Aprenda com os melhores profissionais do mercado veterinário brasileiro'
    },
    {
      icon: BookOpen,
      title: 'Material Complementar',
      description: 'PDFs, slides e recursos extras para aprofundar seu conhecimento'
    },
    {
      icon: TrendingUp,
      title: 'Atualizações Constantes',
      description: 'Conteúdo sempre atualizado com as últimas tendências e técnicas'
    },
    {
      icon: CheckCircle2,
      title: 'Acesso Vitalício',
      description: 'Estude no seu ritmo com acesso ilimitado ao conteúdo adquirido'
    }
  ];

  return (
    <section id="diferenciais" className={`py-20 lg:py-32 ${
      darkMode ? 'bg-slate-800' : 'bg-[#F8FAFC]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold tracking-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Por Que Escolher a VetAcademy?
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A metodologia que acelera sua evolução profissional
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`p-8 rounded-2xl transition-all duration-300 ${
                darkMode
                  ? 'bg-slate-900 border border-slate-700 hover:border-emerald-500/50'
                  : 'bg-white border border-gray-200 hover:border-emerald-500/50 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                darkMode
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : 'bg-emerald-100 border border-emerald-200'
              }`}>
                <feature.icon className={`w-7 h-7 ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-20 p-12 rounded-3xl text-center relative overflow-hidden ${
            darkMode
              ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20'
              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200'
          }`}
        >
          <div className="relative z-10 space-y-6">
            <h3 className={`text-3xl lg:text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Pronto para Evoluir?
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Junte-se a mais de 10.000 veterinários que já transformaram suas carreiras
            </p>
            <button
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30'
              }`}
            >
              Começar Agora
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}