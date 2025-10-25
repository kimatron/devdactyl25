import React, { useRef, useEffect } from 'react';
import type { FeaturedProject } from '../types';

declare const gsap: any;
declare const ScrollTrigger: any;

const projectsData: FeaturedProject[] = [
    {
        imageUrl: 'https://picsum.photos/seed/emjcamera/800/600',
        title: 'EMJ Camera',
        description: 'A sleek portfolio website for music photographer Emma-Jane, showcasing concert and festival photography with an immersive, gallery-first design.',
        tags: ['Portfolio', 'React', 'Photography'],
        link: 'https://emjcamera.vercel.app/'
    },
    {
        imageUrl: 'https://picsum.photos/seed/musicshop/800/600',
        title: 'Vintage Vinyl Vault',
        description: 'A nostalgic e-commerce platform for my grandfather\'s music CD shop, bringing decades of musical curation to the digital age with secure payments and inventory management.',
        tags: ['E-commerce', 'Next.js', 'Stripe'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/bangforyourbuck/800/600',
        title: 'BangForYourBuck.ie',
        description: 'A crowd-sourced platform tracking pint prices across Ireland. Real-time data submission, interactive maps, and price trends - helping punters find the best value locally.',
        tags: ['Web App', 'Community', 'Maps API'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/divelog/800/600',
        title: 'DiveLog Pro',
        description: 'A technical dive planning and logging application for professional divers. Gas calculations, decompression planning, and dive history tracking all in one place.',
        tags: ['Web App', 'Tools', 'Technical'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/devdactyl-meta/800/600',
        title: 'Devdactyl.ie: A Technical Breakdown',
        description: 'A deep dive into building this very website: GSAP animation architecture, React 19 patterns, TypeScript best practices, and performance optimization strategies.',
        tags: ['Case Study', 'GSAP', 'React'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/bpmsync/800/600',
        title: 'BPM Sync',
        description: 'A DJ utility tool for beat matching and transition planning. Real-time BPM detection, key compatibility analysis, and mix preparation features.',
        tags: ['Audio', 'Web Audio API', 'Tools'],
        link: '#'
    }
];

const ProjectCard: React.FC<{ project: FeaturedProject; size: 'small' | 'medium' | 'large' }> = ({ project, size }) => {
    const sizeClasses = {
        small: 'md:col-span-1 md:row-span-1',
        medium: 'md:col-span-1 md:row-span-2',
        large: 'md:col-span-2 md:row-span-1'
    };

    return (
        <a 
            href={project.link}
            className={`project-card group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-yellow-400/50 transition-all duration-500 ${sizeClasses[size]} min-h-[250px] flex flex-col`}
            target={project.link.startsWith('http') ? '_blank' : '_self'}
            rel={project.link.startsWith('http') ? 'noopener noreferrer' : ''}
        >
            {/* Image Background */}
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                    
                    {/* Description - hidden on small cards, visible on hover for others */}
                    <p className={`text-gray-300 text-sm mb-4 transition-all duration-500 ${
                        size === 'small' 
                            ? 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20' 
                            : 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32'
                    }`}>
                        {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span 
                                key={tag} 
                                className="bg-yellow-400/20 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-yellow-400/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0"></div>
            </div>
        </a>
    );
};

const FeaturedWork: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.project-card');

        // Staggered reveal animation
        gsap.fromTo(cards,
            { 
                opacity: 0, 
                y: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: {
                    amount: 0.6,
                    from: "start",
                    ease: "power2.out"
                },
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );

        // Subtle parallax on scroll
        cards.forEach((card) => {
            gsap.to(card as HTMLElement, {
                y: -20,
                scrollTrigger: {
                    trigger: card as HTMLElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });

    }, []);

    // Bento box layout pattern: large, medium, small, small, medium, large
    const layout: Array<'small' | 'medium' | 'large'> = ['large', 'medium', 'small', 'small', 'medium', 'large'];

    return (
        <section id="featured-work" ref={sectionRef} className="py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Featured Work</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">
                        From personal passion projects to client solutions, each built with purpose and precision.
                    </p>
                </div>
                
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6 max-w-7xl mx-auto">
                    {projectsData.map((project, index) => (
                        <ProjectCard 
                            key={project.title} 
                            project={project} 
                            size={layout[index]}
                        />
                    ))}
                </div>

                {/* GitHub Link */}
                <div className="text-center mt-16">
                    <a 
                        href="https://github.com/kimatron" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">View More on GitHub</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;