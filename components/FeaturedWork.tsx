import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const projectsData = [
    {
        title: 'Dive Centre Pro',
        description: 'Comprehensive dive centre management system with real-time dive conditions API, customer records, inventory tracking, and integrated retail engagement platform.',
        imageUrl: 'images/diveshop.png',
        tags: ['Full-Stack', 'API Integration', 'Retail POS'],
        direction: 'left'
    },
    {
        title: 'EMJ Camera',
        description: 'Stunning photographer portfolio featuring GSAP-powered 3D animations, custom client portal for proofing galleries, and integrated print store with Stripe checkout.',
        imageUrl: 'images/emj.jpg',
        tags: ['GSAP', '3D', 'E-commerce'],
        direction: 'right'
    },
    {
        title: 'Vinyl Vault Records',
        description: 'E-commerce platform bringing a 40-year market legacy online. Built for a 92-year-old record collector, digitalizing decades of expertise with modern shopping experience.',
        imageUrl: 'images/webmock.avif',
        tags: ['E-commerce', 'Legacy Business', 'Django'],
        direction: 'left'
    },
    {
        title: 'Bang For The Buck',
        description: 'Crowdsourced pint tracker leveraging real-time community data to find the best-priced pints. Built with Next.js, Supabase, and live location services.',
        imageUrl: 'images/site1.png',
        tags: ['Next.js', 'Supabase', 'Real-time'],
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
                <div className="text-center mb-12">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-4">
                        Featured Work
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A selection of projects showcasing innovative solutions across diverse industries
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    {projectsData.map((project) => (
                        <div 
                            key={project.title}
                            className={`flex flex-wrap items-center gap-6 gs_reveal ${
                                project.direction === 'left' 
                                    ? 'flex-row gs_reveal_fromLeft' 
                                    : 'flex-row-reverse gs_reveal_fromRight'
                            }`}
                        >
                            {/* Image */}
                            <div className="flex-1 min-w-[280px] max-w-[400px]">
                                <div className="relative aspect-square rounded-lg overflow-hidden group">
                                    <img 
                                        src={project.imageUrl} 
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 min-w-[280px] ${project.direction === 'left' ? 'text-right' : 'text-left'}`}>
                                <h3 className="font-jetbrains text-2xl lg:text-4xl font-black text-white mb-4 hover:text-yellow-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-4">
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