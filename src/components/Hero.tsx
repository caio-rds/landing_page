
import { ArrowRight, PlayCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ darkMode }: { darkMode: boolean }) {
  return (
    <section className={`relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden ${
      darkMode ? 'bg-slate-900' : 'bg-[#F8FAFC]'
    }`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-emerald-500' : 'bg-emerald-300'
        }`} />
        <div className={`absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 ${
          darkMode ? 'bg-teal-500' : 'bg-teal-200'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
              style={{
                background: darkMode 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(132, 169, 140, 0.15)',
                borderColor: darkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(132, 169, 140, 0.3)'
              }}
            >
              <Star className={`w-4 h-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} fill="currentColor" />
              <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                Plataforma #1 em Educação Veterinária
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className={`text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Evolução na{' '}
                <span className={`${
                  darkMode 
                    ? 'bg-linear-to-r from-emerald-400 to-teal-400' 
                    : 'bg-linear-to-r from-emerald-600 to-teal-600'
                } bg-clip-text text-transparent`}>
                  Carreira Veterinária
                </span>
              </h1>
              <p className={`text-xl lg:text-2xl leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Especialize-se com cursos práticos ministrados por especialistas reconhecidos. Certificação válida e conteúdo atualizado.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className={`group text-base font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                  darkMode
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30'
                } hover:scale-105`}
              >
                Explorar Cursos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className={`group text-base font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                  darkMode
                    ? 'border-slate-700 hover:bg-slate-800 text-gray-200'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                } hover:scale-105`}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Ver Demonstração
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: '10.000+', label: 'Veterinários' },
                { value: '150+', label: 'Cursos' },
                { value: '4.9/5', label: 'Avaliação' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="space-y-1"
                >
                  <div className={`text-3xl font-bold ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] hidden lg:block"
          >
            <div className={`absolute inset-0 rounded-3xl overflow-hidden ${
              darkMode ? 'bg-slate-800' : 'bg-white'
            } shadow-2xl border ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <div className={`absolute inset-0 flex items-center justify-center`}>
                <div className={`w-full h-full p-12 flex items-center justify-center ${
                  darkMode ? 'gradient-br-dark' : 'gradient-br-light'
                }`}>
                  <svg className={`w-full h-full ${darkMode ? 'text-emerald-400/20' : 'text-emerald-500'}`} viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="2" />
                    <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" />
                    <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="2" />
                    <path d="M200 40 L200 360 M40 200 L360 200" stroke="currentColor" strokeWidth="2" />
                    <circle cx="200" cy="200" r="12" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className={`backdrop-blur-xl rounded-2xl p-6 border ${
                  darkMode 
                    ? 'bg-slate-900/80 border-slate-700 shadow-xl' 
                    : 'bg-white/95 border-gray-200 shadow-2xl shadow-emerald-500/15'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                    }`}>
                      <Star className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Certificação Reconhecida
                      </div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        CFMV Autorizado
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}