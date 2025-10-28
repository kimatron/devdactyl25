import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Workflow from './components/Workflow';
import FeaturedWork from './components/FeaturedWork';
import About from './components/About';
import FAQ from './components/FAQ';
import CTARevamp from './components/CTARevamp';
import Blog from './components/Blog';
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
            <FAQ />
            <CTARevamp setFormData={setFormData} />
            <Blog setView={setView} />
            <Contact formData={formData} setFormData={setFormData} />
          </>
        ) : (
          <BlogPage />
        )}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;