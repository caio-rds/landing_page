import CourseCard from './Card';
import { motion } from 'framer-motion';

export default function CourseGrid({ courses, darkMode }: { courses: any[]; darkMode: boolean }) {
  return (
    <section id="cursos" className={`py-20 lg:py-32 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
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
            Cursos em Destaque
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Conteúdo prático e atualizado, ministrado por especialistas reconhecidos no mercado veterinário
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              darkMode={darkMode}
              index={index}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <button
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
              darkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
            }`}
          >
            Ver Todos os Cursos
          </button>
        </motion.div>
      </div>
    </section>
  );
}