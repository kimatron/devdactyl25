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
        title: 'Coral Guardians',
        description: 'Interactive WebGL experience showcasing climate impact on coral reefs. Educational storytelling for a marine conservation NGO.',
        imageUrl: 'https://picsum.photos/seed/digitalcoral/800/800',
        tags: ['WebGL', 'Three.js', 'Storytelling'],
        direction: 'left'
    },
    {
        title: 'SoundWeave',
        description: 'Minimalist portfolio with integrated audio players and beat-matched visualizer. Dynamic, responsive design for a music producer.',
        imageUrl: 'https://picsum.photos/seed/soundgalaxy/800/800',
        tags: ['Web Design', 'GSAP', 'Audio API'],
        direction: 'right'
    },
    {
        title: 'GreenTech Dashboard',
        description: 'Analytics dashboard visualizing environmental data in actionable ways. Complex data made accessible for sustainability startups.',
        imageUrl: 'https://picsum.photos/seed/greendata/800/800',
        tags: ['Data Viz', 'SaaS', 'UI Design'],
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
                <div className="h-[40vh] flex items-center justify-center">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white text-center gs_reveal">
                        Featured Work
                    </h2>
                </div>

                <div className="flex flex-col gap-6">
                    {projectsData.map((project) => (
                        <div 
                            key={project.title}
                            className={`flex flex-wrap items-center gap-4 min-h-[33vh] border-t border-dashed border-gray-700 pt-6 gs_reveal ${
                                project.direction === 'left' 
                                    ? 'flex-row gs_reveal_fromLeft' 
                                    : 'flex-row-reverse gs_reveal_fromRight'
                            }`}
                        >
                            {/* Image */}
                            <div className="flex-1 min-w-[250px]">
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                    <img 
                                        src={project.imageUrl} 
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 min-w-[250px] ${project.direction === 'left' ? 'text-right' : 'text-left'}`}>
                                <h3 className="font-jetbrains text-xl lg:text-3xl font-black text-white mb-3 gs_reveal">
                                    {project.title}
                                </h3>
                                <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-3 gs_reveal">
                                    {project.description}
                                </p>
                                <div className={`flex flex-wrap gap-2 gs_reveal ${project.direction === 'left' ? 'justify-end' : 'justify-start'}`}>
                                    {project.tags.map(tag => (
                                        <span 
                                            key={tag} 
                                            className="text-xs font-semibold text-yellow-400 border border-yellow-400/30 px-2 py-1 rounded-full"
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