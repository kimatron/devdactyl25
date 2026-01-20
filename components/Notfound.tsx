import React, { useEffect, useRef } from 'react';

declare const gsap: any;

const NotFound: React.FC = () => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined') {
            // Fallback: ensure everything is visible if GSAP doesn't load
            if (textRef.current) textRef.current.style.opacity = '1';
            if (messageRef.current) messageRef.current.style.opacity = '1';
            if (buttonRef.current) buttonRef.current.style.opacity = '1';
            return;
        }

        // Ensure glitch layers start hidden bla bla bla
        gsap.set([text1Ref.current, text2Ref.current], { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.2 });

        // Initial entry animation - NO opacity changes to ensure visibility
        tl.from(textRef.current, {
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)'
        })
        .from(messageRef.current, {
            y: 30,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.3')
        .from(buttonRef.current, {
            y: 20,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.3');

        // Aggressive glitch effect
        const glitch = () => {
            // Show glitch layers
            gsap.set([text1Ref.current, text2Ref.current], { opacity: 0.6 });
            
            // Random position shifts for RGB layers
            gsap.to(text1Ref.current, {
                x: gsap.utils.random(-10, 10),
                y: gsap.utils.random(-4, 4),
                duration: 0.05,
                repeat: 5,
                yoyo: true,
                ease: 'none'
            });

            gsap.to(text2Ref.current, {
                x: gsap.utils.random(-10, 10),
                y: gsap.utils.random(-4, 4),
                duration: 0.05,
                repeat: 5,
                yoyo: true,
                ease: 'none'
            });

            // Reset and hide
            gsap.to([text1Ref.current, text2Ref.current], {
                x: 0,
                y: 0,
                duration: 0.05,
                delay: 0.25,
                onComplete: () => {
                    gsap.set([text1Ref.current, text2Ref.current], { opacity: 0 });
                }
            });
        };

        // Run glitch effect periodically
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.5) { // 50% chance
                glitch();
            }
        }, 1500);

        // Subtle breathing animation
        gsap.to(textRef.current, {
            scale: 1.02,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        return () => {
            clearInterval(glitchInterval);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]" style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/gun-metal.png')",
            backgroundAttachment: 'fixed'
        }}>
            <div className="text-center max-w-2xl">
                <div className="relative inline-block mb-8">
                    <h1 
                        ref={textRef}
                        className="font-jetbrains text-8xl md:text-9xl font-black relative"
                        style={{
                            color: '#ffff00',
                            textShadow: '0 0 80px rgba(255, 255, 0, 1), 0 0 40px rgba(255, 255, 0, 1), 0 4px 8px rgba(0, 0, 0, 1)',
                            zIndex: 20,
                            WebkitTextStroke: '2px rgba(255, 255, 0, 0.3)',
                            opacity: 1,
                            mixBlendMode: 'normal'
                        }}
                    >
                        404
                    </h1>
                    {/* Red glitch layer - hidden by default, only shows during glitch */}
                    <span
                        ref={text1Ref}
                        className="font-jetbrains text-8xl md:text-9xl font-black absolute pointer-events-none"
                        style={{
                            color: '#ff0033',
                            opacity: 0,
                            mixBlendMode: 'screen',
                            zIndex: 19,
                            top: 0,
                            left: 0,
                            width: '100%'
                        }}
                        aria-hidden="true"
                    >
                        404
                    </span>
                    {/* Cyan glitch layer - hidden by default, only shows during glitch */}
                    <span
                        ref={text2Ref}
                        className="font-jetbrains text-8xl md:text-9xl font-black absolute pointer-events-none"
                        style={{
                            color: '#00ffff',
                            opacity: 0,
                            mixBlendMode: 'screen',
                            zIndex: 18,
                            top: 0,
                            left: 0,
                            width: '100%'
                        }}
                        aria-hidden="true"
                    >
                        404
                    </span>
                </div>
                
                <div ref={messageRef} style={{ opacity: 1 }}>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{
                        color: '#ffffff',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 1)'
                    }}>
                        Page Not Found
                    </h2>
                    <p className="text-lg mb-8" style={{
                        color: '#ffffff',
                        textShadow: '0 0 15px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 1)',
                        fontWeight: 600
                    }}>
                        This page has gone the way of the dinosaurs – extinct but not forgotten!
                    </p>
                </div>

                <a
                    ref={buttonRef}
                    href="/"
                    className="inline-block font-bold px-10 py-4 rounded-lg transition-all duration-300 transform hover:scale-110 text-xl"
                    style={{
                        backgroundColor: '#ffff00',
                        color: '#000000',
                        boxShadow: '0 0 40px rgba(255, 255, 0, 1), 0 8px 20px rgba(0, 0, 0, 0.8)',
                        fontWeight: 800,
                        border: '3px solid rgba(255, 255, 0, 0.5)',
                        opacity: 1
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffff66';
                        e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 255, 0, 1), 0 10px 30px rgba(0, 0, 0, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffff00';
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 255, 0, 1), 0 8px 20px rgba(0, 0, 0, 0.8)';
                    }}
                >
                    Take Me Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;