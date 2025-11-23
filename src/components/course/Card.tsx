
import { Star, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';


export default function CourseCard({ course, darkMode, index }: { course: any; darkMode: boolean; index: number }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? darkMode ? 'text-amber-400 fill-amber-400' : 'text-amber-500 fill-amber-500'
            : darkMode ? 'text-slate-600' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className={`h-full rounded-2xl overflow-hidden transition-all duration-500 ${
        darkMode
          ? 'bg-slate-800 border border-slate-700 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-500/20'
          : 'bg-white border border-gray-200 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-600/20'
      }`}>
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
          {course.cover_image ? (
            <img
              src={course.cover_image}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-gradient-to-br from-emerald-100 to-teal-100'
            }`}>
              <svg className={`w-20 h-20 ${darkMode ? 'text-emerald-400/30' : 'text-emerald-600/30'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          )}
          {course.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm text-xs font-semibold"
              style={{
                background: darkMode ? 'rgba(16, 185, 129, 0.9)' : 'rgba(5, 150, 105, 0.9)',
                color: 'white'
              }}
            >
              Destaque
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-6 space-y-4">
          {/* Category */}
          {course.category && (
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              darkMode
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {course.category}
            </div>
          )}

          {/* Title */}
          <h3 className={`text-xl font-bold line-clamp-2 leading-snug ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {course.title}
          </h3>

          {/* Description */}
          {course.description && (
            <p className={`text-sm line-clamp-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {course.description}
            </p>
          )}

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {course.instructor}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Especialista
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t"
            style={{
              borderColor: darkMode ? 'rgba(71, 85, 105, 0.5)' : 'rgba(229, 231, 235, 1)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {course.duration}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(course.rating)}
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-2">
            {course.price && (
              <div>
                <span className={`text-2xl font-bold ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  R$ {course.price}
                </span>
              </div>
            )}
            <button
              className={`ml-auto transition-all duration-300 px-4 py-2 rounded-lg ${
                darkMode
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              Ver Curso
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}