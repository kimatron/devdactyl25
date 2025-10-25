import React, { useEffect, useRef } from 'react';

declare const gsap: any;

const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.1) this.size -= 0.01;
            }

            draw() {
                if (ctx) {
                    ctx.fillStyle = 'rgba(250, 204, 21, 0.6)';
                    ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }

        const init = () => {
            particles = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let speedX = (Math.random() * 0.4) - 0.2;
                let speedY = (Math.random() * 0.4) - 0.2;
                particles.push(new Particle(x, y, size, speedX, speedY));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                    let size = (Math.random() * 2) + 1;
                    let x = Math.random() * (innerWidth - size * 2) + size * 2;
                    let y = Math.random() * (innerHeight - size * 2) + size * 2;
                    let speedX = (Math.random() * 0.4) - 0.2;
                    let speedY = (Math.random() * 0.4) - 0.2;
                    particles.push(new Particle(x, y, size, speedX, speedY));
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        init();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            init();
        });

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="hero-canvas"></canvas>;
};

const Hero: React.FC = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        if (typeof gsap === 'undefined') return;

        const tl = gsap.timeline({delay: 0.5});

        tl.fromTo('.title-part-1', 
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power4.out' }
        )
        .fromTo('.title-part-3', 
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power4.out' },
            "-=1" // Start at the same time as the first part
        )
        .fromTo('.title-part-2',
            { y: -200, opacity: 0, scale: 1.5 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'bounce.out'},
            "-=0.7" // Overlap slightly
        );

        gsap.fromTo('.tagline', 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: 'power2.out'}
        );

         gsap.fromTo('.scroll-down', 
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 2, ease: 'power2.out', repeat: -1, yoyo: true }
        );
        
    }, []);

    return (
        <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center relative text-center overflow-hidden">
            <ParticleCanvas />
            <div className="relative z-10 p-6">
                <h1 ref={titleRef} className="font-jetbrains text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-glow flex items-center justify-center" aria-label="Devdactyl">
                    <span className="title-part-1 inline-block">de</span>
                    <span className="title-part-2 text-yellow-400 yellow-glow inline-block">V</span>
                    <span className="title-part-3 inline-block">dactyl</span>
                </h1>
                <p className="tagline text-lg md:text-2xl mt-4 text-gray-300 max-w-3xl mx-auto">
                    High-performance web design & custom software development. Built in Wexford, Ireland for a global audience.
                </p>
            </div>
             <div className="scroll-down absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                <span className="text-sm text-gray-400">Scroll</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default Hero;