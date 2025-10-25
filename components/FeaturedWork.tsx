import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const projectsData = [
    {
        title: 'Abyss Dive Logger',
        description: 'Technical dive planning and logging with gas mixing and decompression tracking. Built for professional divers who demand precision.',
        imageUrl: 'https://picsum.photos/seed/deepsea/800/800',
        tags: ['Web App', 'React', 'Data Viz'],
        direction: 'left'
    },
    {
        title: 'RaveSphere',
        description: 'Immersive festival companion with live updates and interactive maps. Real-time artist schedules and social features.',
        imageUrl: 'https://picsum.photos/seed/nebularave/800/800',
        tags: ['Mobile-First', 'UI/UX', 'Real-time'],
        direction: 'right'
    },
    {
        title: 'SoundWeave',
        description: 'Minimalist portfolio with integrated audio players and beat-matched visualizer. Dynamic, responsive design for a music producer.',
        imageUrl: 'https://picsum.photos/seed/soundgalaxy/800/800',
        tags: ['Web Design', 'GSAP', 'Audio API'],
        direction: 'left'
    },
    {
        title: 'Quantum Commerce',
        description: 'Next-gen e-commerce with AI-powered recommendations. Blazing-fast, headless architecture built for scale.',
        imageUrl: 'https://picsum.photos/seed/quantumweb/800/800',
        tags: ['E-commerce', 'Next.js', 'AI'],
        direction: 'right'
    }
];

const FeaturedWork: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        function animateFrom(elem: HTMLElement, direction: number = 1) {
            let x = 0;
            let y = direction * 100;
            
            if (elem.classList.contains("gs_reveal_fromLeft")) {
                x = -100;
                y = 0;
            } else if (elem.classList.contains("gs_reveal_fromRight")) {
                x = 100;
                y = 0;
            }
            
            gsap.fromTo(elem, 
                { x: x, y: y, autoAlpha: 0 },
                {
                    duration: 1.25,
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    ease: "expo",
                    overwrite: "auto"
                }
            );
        }

        function hide(elem: HTMLElement) {
            gsap.set(elem, { autoAlpha: 0 });
        }

        const reveals = gsap.utils.toArray(".gs_reveal") as HTMLElement[];
        
        reveals.forEach((elem) => {
            hide(elem);
            
            ScrollTrigger.create({
                trigger: elem,
                onEnter: () => animateFrom(elem),
                onEnterBack: () => animateFrom(elem, -1),
                onLeave: () => hide(elem)
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} id="featured-work" className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-4">
                        Featured Work
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A selection of projects showcasing innovative solutions across diverse industries
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {projectsData.map((project) => (
                        <div 
                            key={project.title}
                            className={`flex flex-wrap items-center gap-8 border-t border-dashed border-gray-700 pt-12 gs_reveal ${
                                project.direction === 'left' 
                                    ? 'flex-row gs_reveal_fromLeft' 
                                    : 'flex-row-reverse gs_reveal_fromRight'
                            }`}
                        >
                            {/* Image */}
                            <div className="flex-1 min-w-[300px]">
                                <div className="relative aspect-square rounded-lg overflow-hidden group">
                                    <img 
                                        src={project.imageUrl} 
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 min-w-[300px] ${project.direction === 'left' ? 'text-right' : 'text-left'}`}>
                                <h3 className="font-jetbrains text-3xl lg:text-5xl font-black text-white mb-6 hover:text-yellow-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className={`flex flex-wrap gap-2 ${project.direction === 'left' ? 'justify-end' : 'justify-start'}`}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;