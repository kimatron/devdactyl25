import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
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
import BlogPostPage from './components/BlogPostPage';
import BackToTopButton from './components/BackToTopButton';
import CaseStudy from './components/CaseStudy';
import SmoothPageLoader from './components/Smoothpageloader.tsx';
import ScrollProgress from './components/ScrollProgress.tsx';
import NotFound from './components/NotFound.tsx';

import { projectsData } from './components/FeaturedWork';
import type { Project } from './types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

  const handleOpenCaseStudy = (project: Project) => {
    navigate(`/case-study/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Workflow />
      <FeaturedWork onOpenCaseStudy={handleOpenCaseStudy} />
      <About />
      <Blog />
      <CTARevamp setFormData={setFormData} />
      <FAQ />
      <Contact formData={formData} setFormData={setFormData} />
      <Footer />
      <BackToTopButton />
    </>
  );
};

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <CaseStudy project={project} onBack={() => navigate('/')} />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SmoothPageLoader>
        <div className="antialiased text-gray-200 overflow-x-hidden">
          <ScrollProgress />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<><Header /><BlogPage /><Footer /><BackToTopButton /></>} />
            <Route path="/blog/:slug" element={<><Header /><BlogPostPage /><Footer /><BackToTopButton /></>} />
            <Route path="/case-study/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<><Header /><NotFound /><Footer /></>} />
          </Routes>
        </div>
      </SmoothPageLoader>
    </BrowserRouter>
  );
};

export default App;