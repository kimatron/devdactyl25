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
        title: 'Creative Design',
        description: 'Beautiful, intuitive design systems with engaging GSAP-powered animations that bring your brand to life.',
        imageUrl: 'https://picsum.photos/seed/abstractui/800/800',
        direction: 'left'
    }
];

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
        
        cards.forEach((card) => {
            gsap.set(card, { autoAlpha: 0, y: 50 });
            
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
        <section ref={sectionRef} id="services" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-4">
                        What We Do
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Cutting-edge digital solutions tailored to your unique needs
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div 
                            key={service.title}
                            className="service-card group relative"
                        >
                            {/* Image with overlay */}
                            <div className="relative h-72 rounded-lg overflow-hidden mb-6">
                                <img 
                                    src={service.imageUrl} 
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/80 transition-all duration-500"></div>
                                
                                {/* Service number */}
                                <div className="absolute top-4 right-4 font-jetbrains text-6xl font-black text-white/10 group-hover:text-yellow-400/20 transition-colors duration-500">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Title overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="font-jetbrains text-2xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 text-base leading-relaxed px-2">
                                {service.description}
                            </p>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 h-1 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;