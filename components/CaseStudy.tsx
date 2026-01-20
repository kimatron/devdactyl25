import React, { useEffect, useRef } from 'react';
import type { Project } from '../types';

declare const gsap: any;

interface CaseStudyProps {
    project: Project;
    onBack: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ project, onBack }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined') return;

        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.from(".cs-animate", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
            
            gsap.from(".cs-image", {
                scale: 1.05,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [project]);

    // Fix the image path if it doesn't start with /
    const imageUrl = project.imageUrl.startsWith('/') 
        ? project.imageUrl 
        : `/${project.imageUrl}`;

    return (
        <div ref={containerRef} className="min-h-screen pb-40 selection:bg-yellow-400 selection:text-black">
            {/* Top Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg h-20 flex items-center px-6 lg:px-12 border-b border-white/10">
                <button 
                    onClick={onBack} 
                    className="font-jetbrains text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:text-yellow-400 transition-colors group"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back Home
                </button>
            </nav>

            {/* Hero */}
            <header className="pt-40 px-6 max-w-7xl mx-auto text-center">
                <div className="cs-animate">
                    <h1 className="font-jetbrains text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                        {project.title}<span className="text-yellow-400">.</span>
                    </h1>
                    <div className="flex justify-center flex-wrap gap-3 mb-16">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-4 py-1 rounded-full text-[10px] font-jetbrains uppercase font-black tracking-widest">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="cs-image relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl max-w-5xl mx-auto">
    <img 
        src={imageUrl} 
        alt={project.title} 
        className="w-full h-auto"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
</div>
            </header>

            {/* Overview */}
            <section className="max-w-4xl mx-auto px-6 mt-20 cs-animate">
                <h3 className="font-jetbrains text-yellow-400 text-xs uppercase tracking-widest mb-6 font-black">Project Overview</h3>
                <p className="text-gray-300 text-2xl leading-relaxed font-light">
                    {project.description}
                </p>
            </section>

            {/* Challenge & Solution */}
            <section className="max-w-4xl mx-auto px-6 mt-32 grid md:grid-cols-2 gap-20 cs-animate">
                <div>
                    <h3 className="font-jetbrains text-yellow-400 text-xs uppercase tracking-widest mb-6 font-black">The Challenge</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {project.challenge || "Building high-availability systems with focused user experiences."}
                    </p>
                </div>
                <div>
                    <h3 className="font-jetbrains text-yellow-400 text-xs uppercase tracking-widest mb-6 font-black">The Solution</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {project.solution || "Leveraging modern frameworks and custom logic to solve complex business needs."}
                    </p>
                </div>
            </section>

            {/* Features (if available) */}
            {project.features && project.features.length > 0 && (
                <section className="max-w-4xl mx-auto px-6 mt-32 cs-animate">
                    <h2 className="font-jetbrains text-3xl lg:text-5xl font-black mb-16 text-center tracking-tight">
                        Key Features<span className="text-yellow-400">.</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {project.features.map((feature, idx) => (
                            <div key={idx} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300">
                                <div className="font-jetbrains text-yellow-400 text-xs mb-4 uppercase tracking-[0.3em]">
                                    0{idx + 1}
                                </div>
                                <p className="text-gray-300 text-base leading-relaxed">{feature}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Tech Stack */}
            <section className="max-w-7xl mx-auto px-6 mt-40 cs-animate">
                <h2 className="font-jetbrains text-3xl lg:text-5xl font-black mb-16 text-center tracking-tight">
                    Technical Stack<span className="text-yellow-400">.</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(project.techStack || ['React', 'GSAP', 'Node.js', 'Tailwind']).map((tech) => (
                        <div key={tech} className="p-8 bg-white/5 rounded-2xl border border-white/10 text-center hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300">
                            <span className="font-jetbrains text-sm font-bold uppercase tracking-widest text-gray-300">{tech}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="mt-60 text-center cs-animate">
                <div className="h-px w-20 bg-yellow-400 mx-auto mb-12"></div>
                <button 
                    onClick={onBack} 
                    className="font-jetbrains text-3xl lg:text-6xl font-black text-white hover:text-yellow-400 transition-colors tracking-tighter group"
                >
                    Back to Projects <span className="inline-block transition-transform group-hover:-translate-x-4">←</span>
                </button>
            </footer>
        </div>
    );
};

export default CaseStudy;