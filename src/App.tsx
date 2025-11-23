import { Bubble } from '@typebot.io/react'
import Home from './sections/Home'
import ModalDocs from './sections/ModalDocs';
import ModalUserInfo from './sections/ModalUserInfo';
import { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';
import { useHead } from './hooks/useHead';
import { SEO_CONFIG } from './utils/seoConfig';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [typebotOpen, setTypebotOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, setUser } = useUser();

  // Aplicar SEO padrão
  useHead({
    title: SEO_CONFIG.site.fullName,
    description: SEO_CONFIG.site.description,
    keywords: SEO_CONFIG.keywords.home,
    ogTitle: SEO_CONFIG.site.fullName,
    ogDescription: SEO_CONFIG.site.description,
    ogImage: SEO_CONFIG.images.og,
    ogUrl: SEO_CONFIG.site.url,
    twitterCard: SEO_CONFIG.twitter.card,
    canonical: SEO_CONFIG.site.url,
    robots: SEO_CONFIG.robots.default,
    author: SEO_CONFIG.site.author,
  });

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Listener para mensagens do Typebot
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validar origem (opcional, ajuste conforme sua origem do Typebot)
      if (event.data?.type === 'OPEN_MODAL') {
        console.log('Abrindo modal a partir do Typebot', event.data);
        setIsOpen(true);
        // Capturar dados do usuário se enviados
        if (event.data?.userData) {
          setUser({
            name: event.data.userData.name,
            email: event.data.userData.email,
            phone: event.data.userData.phone,
          });
        }
      } else if (event.data?.type === 'CLOSE_MODAL') {
        setIsOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (isOpen && typebotOpen) {
      setTypebotOpen(false);
    }
  }, [isOpen]);

  const handleUserInfoClose = () => {
    setIsUserInfoOpen(false);
  };

  const handleUserSaved = () => {
    setIsUserInfoOpen(false);
    // Abre modal de documentos após salvar os dados do usuário
    setIsOpen(true);
  };

  const handleUserInfoClick = () => {
    if (!user || !user.name || !user.email || !user.phone) {
      // Se não tiver dados, abre o modal em modo de edição
      setIsUserInfoOpen(true);
    } else {
      // Se tiver dados, abre o modal em modo de visualização
      setIsUserInfoOpen(true);
    }
  };

  return (
    <div className={`relative ${typebotOpen ? 'md:blur-0 blur-sm' : ''}`}>
      <Home onUserInfoClick={handleUserInfoClick}/>
      <div className="fixed bottom-4 right-4 z-40">
        <Bubble
          typebot="my-typebot-a38pk65"
          apiHost="https://typebot.io"
          theme={{ button: { backgroundColor: "#598E71" } }}
          onOpen={() => setTypebotOpen(true)}
          onClose={() => setTypebotOpen(false)}
        />
      </div>
      <ModalDocs 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onDataExtracted={(data) => console.log(data)}
        darkMode={darkMode}
        user={user!}
      />
      <ModalUserInfo 
        isOpen={isUserInfoOpen}
        onClose={handleUserInfoClose}
        darkMode={darkMode}
        onUserSaved={handleUserSaved}
        isEditMode={!user || !user.name}
      />
    </div>
  )
}

export default App
