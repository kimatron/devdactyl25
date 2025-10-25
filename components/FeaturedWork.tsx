import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const projectsData = [
    {
        title: 'Abyss Dive Logger',
        description: 'Technical dive planning and logging with gas mixing and decompression tracking. Built for professional divers who demand precision.',
        imageUrl: 'https://picsum.photos/seed/deepsea/800/800',
        tags: ['Web App', 'React', 'Data Viz']
    },
    {
        title: 'RaveSphere',
        description: 'Immersive festival companion with live updates and interactive maps. Real-time artist schedules and social features.',
        imageUrl: 'https://picsum.photos/seed/nebularave/800/800',
        tags: ['Mobile-First', 'UI/UX', 'Real-time']
    },
    {
        title: 'SoundWeave',
        description: 'Minimalist portfolio with integrated audio players and beat-matched visualizer. Dynamic, responsive design for a music producer.',
        imageUrl: 'https://picsum.photos/seed/soundgalaxy/800/800',
        tags: ['Web Design', 'GSAP', 'Audio API']
    },
    {
        title: 'Quantum Commerce',
        description: 'Next-gen e-commerce with AI-powered recommendations. Blazing-fast, headless architecture built for scale.',
        imageUrl: 'https://picsum.photos/seed/quantumweb/800/800',
        tags: ['E-commerce', 'Next.js', 'AI']
    }
];

const FeaturedWork: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
        
        cards.forEach((card) => {
            gsap.set(card, { autoAlpha: 0 });
            
            ScrollTrigger.create({
                trigger: card,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(card, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} id="featured-work" className="py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-4">
                        Featured Work
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A selection of projects showcasing innovative solutions across diverse industries
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projectsData.map((project, index) => (
                        <div 
                            key={project.title}
                            className="project-card group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                
                                {/* Number Badge */}
                                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center font-jetbrains font-black text-black text-xl">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-jetbrains text-2xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    {project.description}
                                </p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span 
                                            key={tag} 
                                            className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;