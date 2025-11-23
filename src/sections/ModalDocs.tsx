import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Upload, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

const API_KEY = import.meta.env['vite-api-key'] || "SUA_API_KEY_AQUI";

interface DocumentData {
  tipo_documento: string;
  nome_completo: string;
  cpf: string;
  data_nascimento: string;
  nome_mae: string;
  numero_registro: string;
  crmv?: string;
}

interface ModalDocsProps {
  isOpen: boolean;
  onClose: () => void;
  onDataExtracted?: (data: DocumentData) => void;
  darkMode?: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
  }
}

const ModalDocs: React.FC<ModalDocsProps> = ({ isOpen, onClose, onDataExtracted, darkMode = false, user }) => {
  const { setUser: setContextUser } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  // const [crmv, setCrmv] = useState("");
  // const [crmvLoading, setCrmvLoading] = useState(false);
  // const [crmvValid, setCrmvValid] = useState<boolean | null>(null);
  // const [crmvError, setCrmvError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Converter File para Base64
  async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString().split(',')[1] || '');
      reader.readAsDataURL(file);
    });
    
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
  }

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setData(null);
      setError("");
    } else {
      setError("Por favor, selecione um arquivo de imagem válido.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  };

  const handleExtractData = async () => {
    if (!image) return;

    setLoading(true);
    setError("");

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Analise este documento de identidade brasileiro (pode ser CNH ou RG).
        Extraia os seguintes dados e retorne APENAS um objeto JSON válido, sem blocos de código markdown ('''json):
        {
          "tipo_documento": "CNH ou RG",
          "nome_completo": "",
          "cpf": "",
          "data_nascimento": "dd/mm/aaaa",
          "nome_mae": "",
          "numero_registro": ""
        }
        Se algum campo estiver ilegível, retorne null.
      `;

      const imagePart = await fileToGenerativePart(image);
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      const cleanedText = text.replace(/```json|```/g, '').trim();
      const jsonResult = JSON.parse(cleanedText);

      setData(jsonResult);
      if (onDataExtracted) {
        onDataExtracted(jsonResult);
      }
      setContextUser({
          name: user.name,
          email: user.email,
          phone: user.phone,
          type_document: jsonResult?.tipo_documento,
          document_name: jsonResult?.nome_completo,
          cpf: jsonResult?.cpf,
          birthdate: jsonResult?.data_nascimento,
          mother_name: jsonResult?.nome_mae,
          register_number: jsonResult?.numero_registro,
        });

    } catch (err) {
      console.error("Erro na extração:", err);
      setError("Falha ao ler o documento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setData(null);
    setError("");
  };

  // const handleValidateCrmv = async () => {
  //   if (!crmv.trim()) {
  //     setCrmvError("Digite o CRMV");
  //     return;
  //   }

  //   setCrmvLoading(true);
  //   setCrmvError("");
  //   setCrmvValid(null);

  //   try {
  //     // Fazendo request para validar CRMV
  //     const response = await fetch(
  //       `https://www.cfmv.gov.br/busca-por-profissionais/servicos/2018/10/09/?crmv=${encodeURIComponent(crmv)}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'User-Agent': 'Mozilla/5.0'
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Falha ao validar CRMV');
  //     }

  //     const result = await response.text();
      
  //     // Verificar se encontrou resultados na página
  //     const isValid = result.toLowerCase().includes('profissional') || 
  //                     result.toLowerCase().includes('nome') ||
  //                     !result.toLowerCase().includes('nenhum resultado');
      
  //     setCrmvValid(isValid);
  //     if (isValid) {
  //       // Salvar dados no contexto do usuário após validação bem-sucedida
        
  //     } else {
  //       setCrmvError("CRMV não encontrado. Verifique o número e tente novamente.");
  //     }
  //   } catch (err) {
  //     console.error("Erro ao validar CRMV:", err);
  //     setCrmvError("Erro ao conectar com o serviço de validação. Tente novamente.");
  //     setCrmvValid(false);
  //   } finally {
  //     setCrmvLoading(false);
  //   }
  // };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border ${
              darkMode
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Extrator de Documentos</h2>
              <button
                onClick={handleClose}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                  darkMode
                    ? 'hover:bg-slate-800 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            {
              user && (
                <div className={`px-6 pt-4 pb-2 border-b ${
                  darkMode ? 'border-slate-700' : 'border-gray-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Olá, {user.name.split(' ')[0]}! Envie uma foto do seu documento para extração e validação dos dados automaticamente.
                  </p>
                  <p className='p-2 bg-emerald-600 text-white rounded-md mt-2 text-xs text-center'>
                    Não se preocupe, seus dados estão seguros conosco!
                  </p>
                </div>
              )
            }

            {/* Content */}
            <div className="p-6 space-y-4">
              {!image ? (
                <>
                  {/* Drag & Drop Area */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? darkMode
                          ? 'border-emerald-500/60 bg-emerald-500/10'
                          : 'border-emerald-500 bg-emerald-50'
                        : darkMode
                        ? 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <Upload size={32} className={`mx-auto mb-3 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm mb-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Arraste uma imagem do seu documento aqui
                    </p>
                    <p className={`text-xs mb-4 ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>ou</p>
                    <label className="inline-block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <Upload size={16} />
                        Selecionar Arquivo
                      </span>
                    </label>
                  </div>

                  <p className={`text-xs text-center ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Formatos aceitos: JPG, PNG, GIF, WebP
                  </p>
                </>
              ) : (
                <>
                  {/* Image Preview */}
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className={`w-full h-auto max-h-80 object-cover rounded-xl ${
                        darkMode ? 'border border-slate-700' : 'border border-gray-200'
                      }`}
                    />
                    <p className={`text-sm mt-3 text-center font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {image.name}
                    </p>
                  </div>

                  {/* Extract Button */}
                  {!data && (
                    <button
                      onClick={handleExtractData}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Lendo documento...
                        </>
                      ) : (
                        <>
                          <Upload size={18} />
                          Extrair Dados
                        </>
                      )}
                    </button>
                  )}
                </>
              )}

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              {/* Extracted Data */}
              {data && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border ${
                    darkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`p-4 border-b ${
                    darkMode ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    <h3 className={`font-bold text-lg ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>✓ Dados Extraídos</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: 'Tipo de Documento', value: data.tipo_documento, icon: '📄' },
                      { label: 'Nome Completo', value: data.nome_completo, icon: '👤' },
                      { label: 'CPF', value: data.cpf, icon: '🔢' },
                      { label: 'Data de Nascimento', value: data.data_nascimento, icon: '📅' },
                      { label: 'Nome da Mãe', value: data.nome_mae, icon: '👩' },
                      { label: 'Número de Registro', value: data.numero_registro, icon: '📝' }
                    ].map((item) => (
                      <div key={item.label} className={`flex items-start gap-3 p-3 rounded-lg ${
                        darkMode ? 'bg-slate-700/30' : 'bg-white'
                      }`}>
                        <span className="text-lg mt-1">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {item.label}
                          </p>
                          <p className={`font-medium ${
                            darkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {item.value || '—'}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* CRMV Validation Section */}
                    {/* <div className={`mt-4 p-4 rounded-lg border ${
                      darkMode ? 'bg-slate-700/20 border-slate-600' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <label className={`text-xs font-semibold uppercase tracking-wide mb-2 block ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        🏥 Validar CRMV
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={crmv}
                          onChange={(e) => {
                            setCrmv(e.target.value);
                            setCrmvValid(null);
                            setCrmvError("");
                          }}
                          placeholder="Digite o número do CRMV"
                          className={`flex-1 px-3 py-2 rounded-lg text-sm border transition-colors ${
                            darkMode
                              ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                          disabled={crmvLoading}
                        />
                        <button
                          onClick={handleValidateCrmv}
                          disabled={crmvLoading}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center"
                        >
                          {crmvLoading ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            'Validar'
                          )}
                        </button>
                      </div> */}

                      {/* CRMV Validation Result */}
                      {/* {crmvValid !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-2 p-3 rounded-lg text-sm ${
                            crmvValid
                              ? darkMode
                                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                              : darkMode
                              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                              : 'bg-red-50 border border-red-200 text-red-700'
                          }`}
                        >
                          {crmvValid ? '✓ CRMV validado com sucesso!' : '✗ CRMV inválido'}
                        </motion.div>
                      )}

                      {crmvError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-2 p-3 rounded-lg text-sm ${
                            darkMode
                              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                              : 'bg-red-50 border border-red-200 text-red-700'
                          }`}
                        >
                          {crmvError}
                        </motion.div>
                      )}
                    </div> */}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {image && (
                  <button
                    onClick={handleReset}
                    className={`flex-1 px-4 py-2 border border-emerald-600 text-emerald-600 font-medium rounded-lg transition-colors flex items-center justify-center hover:bg-emerald-50 ${
                      darkMode ? 'hover:bg-emerald-500/10 dark:border-emerald-500' : ''
                    }`}
                  >
                    Voltar
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className={`${image ? 'flex-1' : 'w-full'} px-4 py-2 font-medium rounded-lg transition-colors flex items-center justify-center ${
                    darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-gray-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalDocs;
