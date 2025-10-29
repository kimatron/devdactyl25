import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Workflow from './components/Workflow';
import FeaturedWork from './components/FeaturedWork';
import About from './components/About';
import Blog from './components/Blog';
import CTARevamp from './components/CTARevamp';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import NotFound from './components/Notfound';
import BackToTopButton from './components/BackToTopButton';

const App: React.FC = () => {
  const [view, setView] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [show404, setShow404] = useState(false);

  useEffect(() => {
    // Check URL path for 404 testing
    const path = window.location.pathname;
    if (path === '/404' || path === '/test-404') {
      setShow404(true);
    }
  }, []);

  // For testing: Allow toggling 404 view
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press '4' key twice quickly to toggle 404 preview
      if (e.key === '4') {
        setShow404(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (show404) {
    return <NotFound />;
  }

  return (
    <div className="antialiased text-gray-200 overflow-x-hidden">
      <Header setView={setView} />
      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <Services />
            <Workflow />
            <FeaturedWork />
            <About />
            <Blog setView={setView} />
            <CTARevamp setFormData={setFormData} />
            <FAQ />
            <Contact formData={formData} setFormData={setFormData} />
          </>
        ) : (
          <BlogPage />
        )}
      </main>
      <Footer setView={setView} />
      <BackToTopButton />
      
      {/* Dev helper - shows in bottom corner */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setShow404(!show404)}
          className="fixed bottom-4 left-4 bg-red-500 text-white text-xs px-3 py-2 rounded opacity-50 hover:opacity-100 transition z-50"
          title="Press '4' key to toggle"
        >
          {show404 ? 'Hide' : 'Show'} 404
        </button>
      )}
    </div>
  );
};

export default App;