import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import Multimarcas from './components/Multimarcas';
import Features from './components/Features';
import Shipping from './components/Shipping';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Location from './components/Location';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import ComplianceModals from './components/ComplianceModals';
import AdminPanel from './components/AdminPanel';
import { ComplianceDocType } from './types';
import { syncImagesWithSupabase } from './utils/imageStore';

export default function App() {
  const [activeDoc, setActiveDoc] = useState<ComplianceDocType>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [imagesVersion, setImagesVersion] = useState(0);

  // Synchronize site images with Supabase Storage bucket
  useEffect(() => {
    // 1. Download database JSON registry to sync images
    syncImagesWithSupabase().then((refreshedList) => {
      if (refreshedList) {
        setImagesVersion((v) => v + 1);
      }
    });

    // 2. Refresh immediately when another component issues maxpecas_images_updated
    const handleSyncUpdate = (e: Event) => {
      setImagesVersion((v) => v + 1);
    };

    window.addEventListener('maxpecas_images_updated', handleSyncUpdate);
    return () => {
      window.removeEventListener('maxpecas_images_updated', handleSyncUpdate);
    };
  }, []);

  // Monitor url path /paineladmin or hash #paineladmin to trigger the Admin Panel direct entry
  useEffect(() => {
    const handleUrlCheck = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === '/paineladmin' || pathname === '/paineladmin/' || hash === '#paineladmin') {
        setIsAdminOpen(true);
      }
    };

    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    return () => {
      window.removeEventListener('popstate', handleUrlCheck);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    // Return path to default / to keep browsing experience seamless
    if (window.location.pathname === '/paineladmin' || window.location.pathname === '/paineladmin/') {
      window.history.pushState({}, '', '/');
    } else if (window.location.hash === '#paineladmin') {
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const handleOpenDoc = (doc: 'privacidade' | 'termos' | 'garantia' | 'troca') => {
    setActiveDoc(doc);
    // Lock background scroll when modal is active
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseDoc = () => {
    setActiveDoc(null);
    // Re-enable scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <div className="relative min-h-screen bg-stone-50 select-text font-sans scroll-smooth" id="app-viewport-root">
      {/* Dynamic Overlay Compliance Policy Modals (Google Ads Check requirements) */}
      <ComplianceModals activeDoc={activeDoc} onClose={handleCloseDoc} />

      {/* Admin Panel manager modal dashboard */}
      <AdminPanel isOpen={isAdminOpen} onClose={handleCloseAdmin} />

      {/* Corporate Sticky Header navbar */}
      <Header onOpenDoc={handleOpenDoc} />

      {/* Main Content Layout sections */}
      <main id="app-main-sections">
        {/* 1. Hero Section */}
        <Hero key={`hero-${imagesVersion}`} />

        {/* 2. Sobre a Empresa */}
        <About key={`about-${imagesVersion}`} />

        {/* 3. Categorias de Peças */}
        <Categories key={`categories-${imagesVersion}`} />

        {/* 3.5 Trabalhamos com Peças de Multimarcas */}
        <Multimarcas key={`multimarcas-${imagesVersion}`} />

        {/* 4. Diferenciais */}
        <Features key={`features-${imagesVersion}`} />

        {/* 4.5 Enviamos para Todo o Brasil */}
        <Shipping key={`shipping-${imagesVersion}`} />

        {/* 5. Processo de Atendimento */}
        <HowItWorks />

        {/* 6. Avaliações de Clientes */}
        <Reviews />

        {/* 7. FAQ */}
        <FAQ />

        {/* 8. Localização com Google Maps Pinpoint */}
        <Location />
      </main>

      {/* 9. Rodapé completo & Compliance info block */}
      <Footer onOpenDoc={handleOpenDoc} />

      {/* Conversion Booster: WhatsApp Floating Widget with pulse dynamics */}
      <WhatsAppFloating />
    </div>
  );
}
