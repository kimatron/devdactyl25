import React, { useEffect, useRef } from 'react';

declare const gsap: any;
// FIX: Declare ScrollTrigger to resolve 'Cannot find name' error.
declare const ScrollTrigger: any;

const About: React.FC = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        // FIX: Register ScrollTrigger plugin to enable scroll-based animations.
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
                        <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-6">About Devdactyl</h2>
                        <p className="text-lg text-gray-300 mb-4">
                           Devdactyl is the creative studio of Kim Hanlon, a developer dedicated to building beautiful, effective websites and software. We combine clean design with robust code to deliver digital solutions that drive results.
                        </p>
                        <p className="text-lg text-gray-300">
                           Based in Wexford, Ireland, we're proud to offer top-tier web development in Ireland and for clients around the globe, from local startups to businesses in the Cayman Islands. Our mission is to build the digital tools you need to succeed.
                        </p>
                    </div>
                    <div className="about-image flex justify-center items-center">
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                            <img src="images/kimface.jpeg" alt="Abstract 3D render of a fossil" className="relative w-full h-full object-cover rounded-full border-4 border-[#333333] shadow-2xl"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;