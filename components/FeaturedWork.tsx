import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { FeaturedProject } from '../types';

declare const gsap: any;
declare const Draggable: any;

const projectsData: FeaturedProject[] = [
    {
        imageUrl: 'https://picsum.photos/seed/deepsea/1024/768',
        title: 'Abyss Dive Logger',
        description: 'A comprehensive web app for technical scuba divers to plan, log, and analyze complex dives with gas mixing and decompression tracking.',
        tags: ['Web App', 'React', 'Data Viz', 'UX'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/nebularave/1024/768',
        title: 'RaveSphere Festival App',
        description: 'An immersive companion app for an electronic music festival, featuring interactive maps, artist schedules with live updates, and social integrations.',
        tags: ['Mobile-First', 'UI/UX', 'Real-time'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/digitalcoral/1024/768',
        title: 'Coral Guardians Initiative',
        description: 'An interactive WebGL experience showcasing the impact of climate change on coral reefs, for a leading marine conservation NGO.',
        tags: ['WebGL', 'Three.js', 'Storytelling'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/soundgalaxy/1024/768',
        title: 'SoundWeave Portfolio',
        description: 'A slick, minimalist portfolio for a music producer, with integrated audio players and a dynamic, beat-matched visualizer.',
        tags: ['Web Design', 'GSAP', 'Audio API'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/greendata/1024/768',
        title: 'GreenTech Dashboard',
        description: 'An analytics dashboard for a sustainability startup, visualizing complex environmental data in an accessible and actionable way.',
        tags: ['Data Viz', 'SaaS', 'UI Design'],
        link: '#'
    },
    {
        imageUrl: 'https://picsum.photos/seed/quantumweb/1024/768',
        title: 'Quantum E-Commerce',
        description: 'Next-generation e-commerce platform using AI-powered recommendations and a blazing-fast, headless architecture.',
        tags: ['E-commerce', 'Next.js', 'AI'],
        link: '#'
    }
];

const ProjectCard: React.FC<{ project: FeaturedProject }> = ({ project }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden h-full group flex flex-col border border-white/20">
            <div className="glow-border"></div>
            <div className="overflow-hidden">
                 <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-yellow-400/10 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                 <a href={project.link} className="font-semibold text-white group-hover:text-yellow-400 transition-colors self-start mt-auto">
                    View Project &rarr;
                </a>
            </div>
        </div>
    );
};

const FeaturedWork: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const goToIndex = useCallback((index: number) => {
        const newIndex = (index + projectsData.length) % projectsData.length;
        setActiveIndex(newIndex);
    }, []);

    const goToNext = useCallback(() => {
        goToIndex(activeIndex + 1);
    }, [activeIndex, goToIndex]);

    const goToPrev = useCallback(() => {
        goToIndex(activeIndex - 1);
    }, [activeIndex, goToIndex]);

    useEffect(() => {
        if (!wrapperRef.current) return;
        const items: HTMLElement[] = gsap.utils.toArray('.carousel-item');
        
        items.forEach((item, i) => {
            const offset = i - activeIndex;
            const isBehind = Math.abs(offset) > 0;
            
            gsap.to(item, {
                x: `${offset * 30}%`,
                translateZ: isBehind ? -400 : 0,
                scale: isBehind ? 0.85 : 1,
                rotationY: offset * -35,
                opacity: isBehind ? 0.3 : 1,
                filter: isBehind ? 'blur(8px)' : 'blur(0px)',
                zIndex: projectsData.length - Math.abs(offset),
                duration: 0.7,
                ease: 'power3.out'
            });

            if (offset === 0) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });
    }, [activeIndex]);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof Draggable === 'undefined') return;
        gsap.registerPlugin(Draggable);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrev();
            if (e.key === 'ArrowRight') goToNext();
        };

        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        window.addEventListener('keydown', handleKeyDown);
        
        const draggableInstance = Draggable.create(wrapper, {
            type: 'x',
            dragResistance: 0.2,
            edgeResistance: 0.5,
            onDragEnd: function() {
                if (this.getDirection() === 'left' && this.x < -50) {
                    goToNext();
                } else if (this.getDirection() === 'right' && this.x > 50) {
                    goToPrev();
                }
            }
        });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (draggableInstance && draggableInstance[0]) {
                draggableInstance[0].kill();
            }
        };
    }, [goToNext, goToPrev]);

    return (
        <section id="featured-work" ref={wrapperRef} className="py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-6 text-center mb-12">
                <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Featured Work</h2>
                <p className="text-lg text-gray-400 mt-2">Swipe, click, or use arrow keys to explore.</p>
            </div>
            
            <div className="carousel-wrapper">
                <div className="carousel">
                    {projectsData.map((project, index) => (
                        <div key={index} className="carousel-item">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="carousel-nav">
                <button onClick={goToPrev} aria-label="Previous Project">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={goToNext} aria-label="Next Project">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default FeaturedWork;