import React, { useState, useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

const CTARevamp: React.FC<{ setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string; }>> }> = ({ setFormData }) => {
    const [url, setUrl] = useState('');
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;
        
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(sectionEl,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 85%',
                }
            }
        );
    }, []);

    const normalizeUrl = (input: string): string => {
        let normalized = input.trim();
        
        // If it doesn't start with http:// or https://, add https://
        if (!normalized.match(/^https?:\/\//i)) {
            normalized = 'https://' + normalized;
        }
        
        return normalized;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        const normalizedUrl = normalizeUrl(url);
        const message = `Hi Kim,\n\nI'd like a free diagnosis of my current website: ${normalizedUrl}\n\nLooking forward to hearing your thoughts.`;
        setFormData(prev => ({ ...prev, message }));

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                const messageEl = document.getElementById('message') as HTMLTextAreaElement;
                if(messageEl) {
                    messageEl.focus();
                }
            }, 800);
        }
    };

    return (
        <section ref={sectionRef} id="cta-revamp" className="py-20 lg:py-24">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-md rounded-lg border border-white/20 p-8 lg:p-12 text-center">
                    <h2 className="font-jetbrains text-3xl lg:text-4xl font-black text-white">Is Your Website Holding You Back?</h2>
                    <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
                        Get a free, no-obligation diagnosis of your current site. I'll check for performance issues, design flaws, and missed opportunities, then provide a clear quote to get it firing on all cylinders.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="www.your-website.com"
                            required
                            className="flex-grow w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 focus:bg-white/10 transition"
                            aria-label="Your website URL"
                        />
                        <button type="submit" className="flex-shrink-0 bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg">
                            Get My Free Review
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-3">This will scroll you to the contact form to complete your request.</p>
                </div>
            </div>
        </section>
    );
};

export default CTARevamp;