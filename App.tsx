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
import CaseStudy from './components/CaseStudy';
// Inline CaseStudy component used as a fallback while './components/CaseStudy' is not present.
// This preserves the same API (props) that App expects.
import type { Project } from './types';

// const CaseStudy: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
//   return (
//     <section className="px-6 py-12 max-w-4xl mx-auto">
//       <button onClick={onBack} className="mb-6 text-sm text-blue-400">← Back</button>
//       <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">{JSON.stringify(project, null, 2)}</pre>
//     </section>
//   );
// };

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'blog' | 'case-study'>('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedProject(project);
    setView('case-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="antialiased text-gray-200 overflow-x-hidden">
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
  );
};

export default App;