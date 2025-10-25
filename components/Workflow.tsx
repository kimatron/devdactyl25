import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const workflowSteps = [
    {
        number: '01',
        title: 'Discovery',
        description: 'We dive deep into your business goals, target audience, and project requirements. Like planning a technical dive, every detail matters.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        )
    },
    {
        number: '02',
        title: 'Design',
        description: 'Wireframes, mockups, and prototypes bring your vision to life. We iterate until every pixel serves a purpose and delights users.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        )
    },
    {
        number: '03',
        title: 'Development',
        description: 'Clean, efficient code built with the latest technologies. Rigorous testing ensures everything works flawlessly across all devices.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        )
    },
    {
        number: '04',
        title: 'Launch',
        description: 'Deployment, monitoring, and ongoing support. We ensure a smooth launch and stand by to optimize and scale as you grow.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
];

const Workflow: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        // Original GSAP scroll reveal functions
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

        // Animate the connecting line (desktop only)
        if (lineRef.current && window.innerWidth >= 1024) {
            gsap.fromTo(lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} id="workflow" className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-4">
                        Our Process
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A proven workflow refined through diverse experiences, from technical diving to digital design
                    </p>
                </div>

                {/* Desktop: Horizontal Layout with Connecting Line */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Connecting Line */}
                        <div 
                            ref={lineRef}
                            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-400/50 to-yellow-400 transform -translate-y-1/2 origin-left"
                            style={{ top: '60px' }}
                        ></div>

                        {/* Steps */}
                        <div className="grid grid-cols-4 gap-6">
                            {workflowSteps.map((step, index) => (
                                <div 
                                    key={step.number} 
                                    className={`workflow-card relative gs_reveal ${
                                        index % 2 === 0 ? 'gs_reveal_fromLeft' : 'gs_reveal_fromRight'
                                    }`}
                                >
                                    {/* Number Circle */}
                                    <div className="relative z-10 mb-6">
                                        <div className="w-24 h-24 rounded-full bg-black border-4 border-yellow-400 flex items-center justify-center mx-auto relative">
                                            <span className="font-jetbrains text-3xl font-black text-yellow-400">
                                                {step.number}
                                            </span>
                                            {/* Icon Badge */}
                                            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-lg">
                                                {step.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300">
                                        <h3 className="font-jetbrains text-xl font-black text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: Vertical Layout */}
                <div className="lg:hidden space-y-8">
                    {workflowSteps.map((step, index) => (
                        <div 
                            key={step.number} 
                            className={`workflow-card flex gap-4 gs_reveal ${
                                index % 2 === 0 ? 'gs_reveal_fromLeft' : 'gs_reveal_fromRight'
                            }`}
                        >
                            {/* Number Circle - Clean on mobile */}
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-full bg-black border-4 border-yellow-400 flex items-center justify-center">
                                    <span className="font-jetbrains text-xl font-black text-yellow-400">
                                        {step.number}
                                    </span>
                                </div>
                            </div>

                            {/* Content Card with Icon */}
                            <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="text-yellow-400">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-jetbrains text-lg font-black text-white">
                                        {step.title}
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-300 mb-6 text-lg">Ready to bring your vision to life?</p>
                    <a 
                        href="#contact" 
                        className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                        Start Your Project
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Workflow;