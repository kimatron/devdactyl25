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
import BackToTopButton from './components/BackToTopButton';
import CaseStudy from './components/CaseStudy';
import DevdactylLoader from './components/DevdactylLoader';
import type { Project } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'blog' | 'case-study'>('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initial load
  useEffect(() => {
    const loadSite = async () => {
      try {
        // Wait for fonts and GSAP to be ready
        await Promise.all([
          document.fonts.ready,
          new Promise<void>(resolve => {
            if (typeof (window as any).gsap !== 'undefined') {
              resolve();
            } else {
              // Fallback timeout
              setTimeout(() => resolve(), 500);
            }
          })
        ]);
        
        // Small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (err) {
        console.error('Loading error:', err);
        // Fail gracefully
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    loadSite();
  }, []);

  const handleOpenCaseStudy = (project: Project) => {
    setIsTransitioning(true);
    
    // Smooth transition out
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.to('.main-content', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          setSelectedProject(project);
          setView('case-study');
          window.scrollTo({ top: 0, behavior: 'instant' });
          
          // Transition in
          gsap.fromTo('.main-content',
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              onComplete: () => setIsTransitioning(false)
            }
          );
        }
      });
    } else {
      // Fallback without GSAP
      setSelectedProject(project);
      setView('case-study');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleBackToHome = () => {
    setIsTransitioning(true);
    
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.to('.main-content', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          setView('home');
          window.scrollTo({ top: 0, behavior: 'instant' });
          
          gsap.fromTo('.main-content',
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5,
              onComplete: () => setIsTransitioning(false)
            }
          );
        }
      });
    } else {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Show loader on initial load
  if (isLoading) {
    return <DevdactylLoader />;
  }

  return (
    <div className="antialiased text-gray-200 overflow-x-hidden">
      {/* Transition overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center pointer-events-none">
          <div className="font-jetbrains text-yellow-400 text-2xl animate-pulse">
            Loading...
          </div>
        </div>
      )}
      
      <div className="main-content">
        {view !== 'case-study' && <Header setView={setView} />}
        <main>
          {view === 'home' ? (
            <>
              <Hero />
              <Services />
              <Workflow />
              <FeaturedWork onOpenCaseStudy={handleOpenCaseStudy} />
              <About />
              <Blog setView={setView} />
              <CTARevamp setFormData={setFormData} />
              <FAQ />
              <Contact formData={formData} setFormData={setFormData} />
            </>
          ) : view === 'blog' ? (
            <BlogPage />
          ) : view === 'case-study' && selectedProject ? (
            <CaseStudy project={selectedProject} onBack={handleBackToHome} />
          ) : null}
        </main>
        {view !== 'case-study' && <Footer setView={setView} />}
        {view !== 'case-study' && <BackToTopButton />}
      </div>
    </div>
  );
};

export default App;