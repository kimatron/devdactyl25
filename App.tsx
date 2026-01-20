// App.tsx - FULL REWRITE with routing
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  // You'll need to get the project from URL params or props
  // This is simplified - you'd actually fetch by slug
  const [selectedProject] = React.useState<Project | null>(null);

  return selectedProject ? (
    <CaseStudy project={selectedProject} onBack={() => navigate('/')} />
  ) : null;
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
          </Routes>
        </div>
      </SmoothPageLoader>
    </BrowserRouter>
  );
};

export default App;