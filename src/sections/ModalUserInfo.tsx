import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

interface ModalUserInfoProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
  onUserSaved?: () => void;
  isEditMode?: boolean;
}

const ModalUserInfo: React.FC<ModalUserInfoProps> = ({ isOpen, onClose, darkMode = false, onUserSaved, isEditMode = false }) => {
  const { user, setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(isEditMode);
  const [errors, setErrors] = useState<{name?: string; email?: string; phone?: string}>({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      // Se tiver dados de documentos, fica em modo de visualização
      if (user.cpf && user.birthdate) {
        setIsEditing(false);
      } else {
        setIsEditing(isEditMode);
      }
    } else {
      setIsEditing(isEditMode);
    }
  }, [user, isEditMode]);

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; phone?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email válido é obrigatório';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setUser({
        name,
        email,
        phone,
      });
      setIsEditing(false);
      onUserSaved?.();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl shadow-2xl max-w-md w-full border ${
              darkMode
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <User size={24} className="text-emerald-600" />
                {isEditing ? 'Preencher Dados' : (user?.cpf ? 'Perfil Validado' : 'Meu Perfil')}
              </h2>
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                  darkMode
                    ? 'hover:bg-slate-800 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {isEditing || !user ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Nome */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({...errors, name: undefined});
                      }}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        errors.name
                          ? darkMode
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-red-500 bg-red-50'
                          : darkMode
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      placeholder="Digite seu nome completo"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({...errors, email: undefined});
                      }}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        errors.email
                          ? darkMode
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-red-500 bg-red-50'
                          : darkMode
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      placeholder="Digite seu email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({...errors, phone: undefined});
                      }}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        errors.phone
                          ? darkMode
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-red-500 bg-red-50'
                          : darkMode
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-gray-50 border-gray-300 text-gray-900'
                      }`}
                      placeholder="Digite seu telefone"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className={`p-3 rounded-lg ${
                    darkMode
                      ? 'bg-amber-500/10 border border-amber-500/30'
                      : 'bg-amber-50 border border-amber-200'
                  }`}>
                    <p className={`text-xs ${
                      darkMode ? 'text-amber-400' : 'text-amber-700'
                    }`}>
                      * Campos obrigatórios
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Informações Obrigatórias */}
                  <div className={`p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <User size={20} className="text-emerald-600 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Nome Completo
                        </p>
                        <p className={`font-medium text-lg ${
                          darkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Mail size={20} className="text-blue-600 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Email
                        </p>
                        <p className={`font-medium break-all ${
                          darkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <Phone size={20} className="text-purple-600 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Telefone
                        </p>
                        <p className={`font-medium ${
                          darkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}>
                          {user.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Informações Adicionais (Documentos) */}
                  {(user.type_document || user.cpf || user.birthdate || user.mother_name || user.register_number) && (
                    <div className={`mt-4 pt-4 border-t ${
                      darkMode ? 'border-slate-700' : 'border-gray-200'
                    }`}>
                      <p className={`text-sm font-semibold mb-3 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        📋 Informações do Documento
                      </p>

                      {user.type_document && (
                        <div className={`p-3 rounded-lg mb-2 ${
                          darkMode
                            ? 'bg-slate-700/30 border border-slate-600'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Tipo de Documento
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {user.type_document}
                          </p>
                        </div>
                      )}

                      {user.document_name && (
                        <div className={`p-3 rounded-lg mb-2 ${
                          darkMode
                            ? 'bg-slate-700/30 border border-slate-600'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Nome do Documento
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {user.document_name}
                          </p>
                        </div>
                      )}

                      {user.cpf && (
                        <div className={`p-3 rounded-lg mb-2 ${
                          darkMode
                            ? 'bg-slate-700/30 border border-slate-600'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            CPF
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {user.cpf}
                          </p>
                        </div>
                      )}

                      {user.birthdate && (
                        <div className={`p-3 rounded-lg mb-2 ${
                          darkMode
                            ? 'bg-slate-700/30 border border-slate-600'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Data de Nascimento
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {user.birthdate}
                          </p>
                        </div>
                      )}

                      {user.mother_name && (
                        <div className={`p-3 rounded-lg mb-2 ${
                          darkMode
                            ? 'bg-slate-700/30 border border-slate-600'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Nome da Mãe
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {user.mother_name}
                          </p>
                        </div>
                      )}

                      {user.register_number && (
                        <div className={`p-3 rounded-lg mb-2 ${
                          darkMode
                            ? 'bg-slate-700/30 border border-slate-600'
                            : 'bg-blue-50 border border-blue-200'
                        }`}>
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Número de Registro
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {user.register_number}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Info Box */}
                  <div className={`p-4 rounded-lg border mt-4 ${
                    user?.cpf
                      ? darkMode
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-emerald-50 border-emerald-200'
                      : darkMode
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-amber-50 border-amber-200'
                  }`}>
                    <p className={`text-sm ${
                      user?.cpf
                        ? darkMode ? 'text-emerald-400' : 'text-emerald-700'
                        : darkMode ? 'text-amber-400' : 'text-amber-700'
                    }`}>
                      {user?.cpf 
                        ? '✓ Dados validados e armazenados com segurança' 
                        : '⚠️ Documentos aguardando validação'}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Button */}
            <div className={`border-t p-4 flex gap-3 ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              {isEditing || !user ? (
                <>
                  <button
                    onClick={onClose}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
                      darkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Fechar
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalUserInfo;
