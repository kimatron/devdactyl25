import React, { useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const About: React.FC = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo((sectionEl as HTMLElement).querySelector('.about-content'),
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo((sectionEl as HTMLElement).querySelector('.about-image'),
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 80%',
                }
            }
        );
    }, []);
    
    return (
        <section id="about" ref={sectionRef} className="py-20 lg:py-32">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="about-content">
                        <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-6">About Devdactyl<span className="text-yellow-400">.</span></h2>
                        <p className="text-lg text-gray-300 mb-4">
                           Devdactyl is the creative studio of Kim Hanlon, a developer dedicated to building beautiful, effective websites and software. We combine clean design with robust code to deliver digital solutions that drive results.
                        </p>
                        <p className="text-lg text-gray-300 mb-6">
                           Based in Wexford, Ireland, we're proud to offer top-tier web development in Ireland and for clients around the globe, from local startups to businesses in the Cayman Islands. Our mission is to build the digital tools you need to succeed.
                        </p>
                        
                        {/* Social Links */}
                        {/* <div className="flex gap-4 mt-8">
                            <a 
                                href="https://github.com/kimatron" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-md px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">GitHub</span>
                            </a>
                            <a 
                                href="https://linkedin.com/in/kimhanlon" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-md px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span className="font-medium">LinkedIn</span>
                            </a>
                        </div> */}
                    </div>
                    <div className="about-image flex justify-center items-center">
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                            <img 
                                src="/images/kimface.jpeg" 
                                alt="Kim Hanlon - Developer at Devdactyl studio" 
                                className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;