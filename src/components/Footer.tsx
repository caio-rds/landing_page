import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ darkMode }: { darkMode: boolean }) {
  const footerLinks = {
    'Plataforma': [
      { label: 'Cursos', href: '#cursos' },
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Diferenciais', href: '#diferenciais' },
      { label: 'Certificação', href: '#' }
    ],
    'Recursos': [
      { label: 'Blog', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Suporte', href: '#' },
      { label: 'Área do Aluno', href: '#' }
    ],
    'Legal': [
      { label: 'Termos de Uso', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Política de Cookies', href: '#' },
      { label: 'Contrato', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className={`border-t ${
      darkMode
        ? 'bg-slate-900 border-slate-800'
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
              }`}>
                <svg className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                VetAcademy
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              A plataforma líder em educação continuada para médicos veterinários no Brasil. Evolua sua carreira com os melhores especialistas.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  contato@vetacademy.com.br
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  (11) 4000-0000
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  São Paulo, SP
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className={`font-semibold text-sm uppercase tracking-wider ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors hover:underline ${
                        darkMode
                          ? 'text-gray-400 hover:text-emerald-400'
                          : 'text-gray-600 hover:text-emerald-600'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
          darkMode ? 'border-slate-800' : 'border-gray-200'
        }`}>
          {/* Copyright */}
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} VetAcademy. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? 'bg-slate-800 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400'
                    : 'bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600'
                }`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}