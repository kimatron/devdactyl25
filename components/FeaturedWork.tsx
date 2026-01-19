import React, { useEffect, useRef } from 'react';
import BrowserMockup from './BrowserMockup';
import type { Project } from '../types';

declare const gsap: any;
declare const ScrollTrigger: any;

const projectsData: Project[] = [
    {
        title: 'Dive Centre Pro',
        description: 'Comprehensive dive centre management system with real-time dive conditions API, customer records, inventory tracking, and integrated retail engagement platform.',
        imageUrl: 'images/diveshop.png',
        tags: ['Full-Stack', 'API Integration', 'Retail POS'],
        direction: 'left',
        challenge: 'Creating a unified platform to manage dive operations, customer data, and retail in one seamless experience.',
        solution: 'Integrated third-party APIs for real-time ocean conditions and built a custom POS system tailored to dive shop workflows.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe']
    },
    {
        title: 'EMJ Camera',
        description: 'Stunning photographer portfolio featuring GSAP-powered 3D animations, custom client portal for proofing galleries, and integrated print store with Stripe checkout.',
        imageUrl: 'images/emj.jpg',
        tags: ['GSAP', '3D', 'E-commerce'],
        direction: 'right',
        challenge: 'Creating a visually striking portfolio that also serves as a functional business tool for client management.',
        solution: 'Leveraged GSAP for smooth 3D transitions and built a secure client portal with watermarked proofing galleries.',
        techStack: ['React', 'GSAP', 'Stripe', 'AWS S3']
    },
    {
        title: 'Vinyl Vault Records',
        description: 'E-commerce platform bringing a 40-year market legacy online. Built for a 92-year-old record collector, digitalizing decades of expertise with modern shopping experience.',
        imageUrl: 'images/webmock.avif',
        tags: ['E-commerce', 'Legacy Business', 'Django'],
        direction: 'left',
        challenge: 'Digitizing 40 years of analog record-keeping and creating an intuitive interface for a non-technical owner.',
        solution: 'Built a custom CMS with simplified inventory management and one-click order processing.',
        techStack: ['Django', 'Python', 'PostgreSQL', 'Stripe']
    },
    {
        title: 'Bang For The Buck',
        description: 'Crowdsourced pint tracker leveraging real-time community data to find the best-priced pints. Built with Next.js, Supabase, and live location services.',
        imageUrl: 'images/site1.png',
        tags: ['Next.js', 'Supabase', 'Real-time'],
        direction: 'right',
        isGIF: true,
        challenge: 'Building a real-time crowdsourced database that stays current and prevents spam submissions.',
        solution: 'Implemented geolocation verification and community moderation with Supabase real-time subscriptions.',
        techStack: ['Next.js', 'Supabase', 'Mapbox', 'PostgreSQL']
    }
];

interface FeaturedWorkProps {
    onOpenCaseStudy?: (project: Project) => void;
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onOpenCaseStudy }) => {
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
                start: "top 85%",
                onEnter: () => animateFrom(elem),
                onEnterBack: () => animateFrom(elem, -1),
                onLeave: () => hide(elem)
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((st: any) => st.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} id="featured-work" className="py-24 bg-transparent relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-jetbrains text-4xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
                        Featured Work<span className="text-yellow-400">.</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A selection of projects showcasing innovative solutions across diverse industries
                    </p>
                </div>

                <div className="flex flex-col gap-32">
                    {projectsData.map((project, idx) => (
                        <div 
                            key={project.title}
                            className={`flex flex-col lg:flex-row items-center gap-12 gs_reveal ${
                                project.direction === 'left' 
                                    ? 'gs_reveal_fromLeft' 
                                    : 'lg:flex-row-reverse gs_reveal_fromRight'
                            }`}
                        >
                            {/* Browser Visual */}
                            <div className="w-full lg:w-3/5">
                                <BrowserMockup 
                                    imageUrl={project.imageUrl} 
                                    title={project.title} 
                                    isGIF={project.isGIF}
                                />
                            </div>

                            {/* Content */}
                            <div className="w-full lg:w-2/5 lg:text-left">
                                <div className="font-jetbrains text-yellow-400 text-xs mb-4 uppercase tracking-[0.3em]">
                                    Project 0{idx + 1}
                                </div>
                                <h3 className="font-jetbrains text-3xl lg:text-5xl font-black text-white mb-6 tracking-tighter hover:text-yellow-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {project.tags.map(tag => (
                                        <span 
                                            key={tag} 
                                            className="text-[10px] font-bold font-jetbrains text-yellow-400 bg-yellow-400/5 border border-yellow-400/20 px-3 py-1 rounded uppercase tracking-widest"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {onOpenCaseStudy && (
                                    <button 
                                        onClick={() => onOpenCaseStudy(project)}
                                        className="group inline-flex items-center gap-3 font-jetbrains text-xs font-bold uppercase tracking-widest border-b-2 border-yellow-400 pb-1 hover:text-yellow-400 transition-colors"
                                    >
                                        View Case Study
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;