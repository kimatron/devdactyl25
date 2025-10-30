import React, { useState } from 'react';
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
import BackToTopButton from './components/BackToTopButton';

const App: React.FC = () => {
  const [view, setView] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
    </div>
  );
};

export default App;