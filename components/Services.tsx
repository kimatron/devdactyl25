import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const servicesData = [
    {
        title: 'Web Development',
        description: 'High-performance websites and e-commerce platforms built for growth. Responsive, fast, and built to convert.',
        imageUrl: 'https://picsum.photos/seed/abstractweb/800/800',
        direction: 'left'
    },
    {
        title: 'Software Development',
        description: 'Bespoke applications and automated workflows engineered to solve your unique business challenges.',
        imageUrl: 'https://picsum.photos/seed/abstractcode/800/800',
        direction: 'right'
    },
    {
        title: 'UX/UI Design',
        description: 'Beautiful, intuitive design systems that make complex tasks feel effortless.',
        imageUrl: 'https://picsum.photos/seed/abstractui/800/800',
        direction: 'left'
    },
    {
        title: 'Creative Animation',
        description: 'Engaging GSAP-powered animations and interactions that bring your brand to life.',
        imageUrl: 'https://picsum.photos/seed/abstractmotion/800/800',
        direction: 'right'
    },
    {
        title: 'Cloud Infrastructure',
        description: 'Scalable, secure cloud architecture with automated deployments and monitoring.',
        imageUrl: 'https://picsum.photos/seed/abstractcloud/800/800',
        direction: 'left'
    }
];

const Services: React.FC = () => {
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
        <section ref={sectionRef} id="services" className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="h-[40vh] flex items-center justify-center">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white text-center gs_reveal">
                        What We Do
                    </h2>
                </div>

                <div className="flex flex-col gap-12">
                    {servicesData.map((service, index) => (
                        <div 
                            key={service.title}
                            className={`flex flex-wrap items-center gap-8 min-h-screen border-t border-dashed border-gray-700 pt-12 gs_reveal ${
                                service.direction === 'left' 
                                    ? 'flex-row gs_reveal_fromLeft' 
                                    : 'flex-row-reverse gs_reveal_fromRight'
                            }`}
                        >
                            {/* Image */}
                            <div className="flex-1 min-w-[300px]">
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                    <img 
                                        src={service.imageUrl} 
                                        alt={service.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 min-w-[300px] ${service.direction === 'left' ? 'text-right' : 'text-left'}`}>
                                <h3 className="font-jetbrains text-3xl lg:text-5xl font-black text-white mb-6 gs_reveal">
                                    {service.title}
                                </h3>
                                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed gs_reveal">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;