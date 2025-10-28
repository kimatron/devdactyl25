import React, { useState, useEffect, useRef } from 'react';

declare const gsap: any;
declare const ScrollTrigger: any;

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What do you actually do?",
        answer: "I’ve probably been asked that more times than my own name. I build custom websites and software that solve real problems. Think of me as a digital architect, I design the blueprint, write the code, and make sure everything works beautifully. Whether it's an e-commerce store, a booking system, or a complex web app, I create solutions that are fast, functional, and designed to grow with your business."
    },
    {
        question: "Why the name 'Devdactyl'?",
        answer: "I was <em>that</em> dinosaur kid. While other girls played with dolls, I was reading about the Jurassic period and collecting fossils. I've got a pterodactyl tooth on my desk right now (yes, really). So 'Devdactyl' is a mashup of 'DEVeloper' and 'pterodactyl' - a nod to my childhood obsession. And no, I don't see the irony in naming a tech company after something famously extinct."
    },
    {
        question: "Do you only build websites?",
        answer: "Nope! I also develop custom software, integrate APIs, automate the boring repetitive stuff, and set up cloud hosting that doesn't crash when people visit your site. I just happen to have developed a massive crush on front-end design and playing with animations. But backend, DevOps, databases? I've got you covered there too."
    },
    {
        question: "Do you offer maintenance or support?",
        answer: "Absolutely. I've spent enough time on dating apps in my time to know how bad ghosting feels, so I <strong>don't disappear after launch</strong>. If you want ongoing updates, security patches, backups, and those little improvements that keep your site running smoothly, I offer maintenance plans. Your site will never be left on read."
    },
    {
        question: "Can you fix my existing website?",
        answer: "Yes! Whether it's broken, slow, outdated, or just kinda ugly, I can diagnose the issues and get it back in shape. Think of it as a digital renovation. I'll assess what's salvageable, what needs rebuilding, and give you an honest plan. No judgment."
    },
    {
        question: "Do you use AI to build websites?",
        answer: "I use AI as a tool, not a crutch. It's great for speeding up boring tasks or writing boilerplate code. But the strategy, design decisions, custom functionality, and that final polish? That's all human. AI can't understand your brand or what makes your business unique. I can."
    },
    {
        question: "How long does it take to build a website?",
        answer: "That’s a bit like asking 'how long does it take to build a house?'. A simple one-page 'brochure' site might take a couple of weeks. A more complex e-commerce site or business platform is more like a custom build, taking one to three months. After we have a chat about what you need, I'll give you a detailed, realistic timeline. No finger-in-the-air guesstimates."
    },
    {
        question: "Do you work with clients outside Ireland?",
        answer: "100%. I've built projects for clients from the West of Ireland to the West Indies. As long as you have a decent internet connection and can tolerate my (very tweaked) Irish accent on a video call, location is not an issue. Thanks to a brain that was never wired to sleep, time zones are just a minor inconvenience. If you've got a project and a solid WiFi connection, we can make it happen."
    },
    {
        question: "How much does a website cost?",
        answer: "The million-dollar question, though hopefully it won't cost that much. It's impossible to have a fixed price list because every project is unique. A simple landing page is a garden shed; a full e-commerce platform is a multi-storey office block. After a brief chat to understand your needs, I provide a detailed, itemised quote. It’s completely transparent, with no nasty surprises later."
    },
    // {
    //     question: "What's your design process like?",
    //     answer: "We start with a discovery session to understand your goals, audience, and brand vibe. Then I create wireframes and mockups for your feedback. Once we nail the design, I move into development, keeping you in the loop with regular check-ins. Before launch, we test everything, and then I hand over a polished, ready-to-go site (plus training if you need it)."
    // },
    // {
    //     question: "Can you help with SEO and online marketing?",
    //     answer: "I build sites with SEO best practices baked in — clean code, fast loading, mobile-friendly, proper meta tags, and semantic HTML. For ongoing SEO strategy, content marketing, or paid ads, I can recommend trusted specialists I've worked with. I focus on building the foundation; they help you dominate the search results."
    // }
];

const FAQAccordionItem: React.FC<{ item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }> = ({ 
    item, 
    index, 
    isOpen, 
    onToggle 
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined') return;
        
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out'
            });
            gsap.to(iconRef.current, {
                rotation: 180,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.in'
            });
            gsap.to(iconRef.current, {
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }, [isOpen]);

    return (
        <div className="border-b border-white/10">
            <button
                onClick={onToggle}
                className="w-full text-left py-6 px-6 flex justify-between items-center group hover:bg-white/5 transition-colors duration-300"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors pr-4">
                    {item.question}
                </h3>
                <div 
                    ref={iconRef}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-yellow-400/20 transition-colors"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-yellow-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div 
                ref={contentRef}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
            >
                <div className="px-6 pb-6">
                    <p 
                        className="text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRef = useRef(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo((sectionEl as HTMLElement).querySelector('.faq-header'),
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo((sectionEl as HTMLElement).querySelectorAll('.faq-item'),
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section id="faq" ref={sectionRef} className="py-20 lg:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 faq-header">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white mb-4">
                        Questions? Answers.
                    </h2>
                    <p className="text-lg text-gray-400">
                        The real talk about what I do, how I work, and why I named my studio after a dinosaur.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
                    {faqData.map((item, index) => (
                        <div key={index} className="faq-item">
                            <FAQAccordionItem
                                item={item}
                                index={index}
                                isOpen={openIndex === index}
                                onToggle={() => handleToggle(index)}
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-400 mb-4">Still have questions?</p>
                    <a 
                        href="#contact" 
                        className="inline-block bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Let's Chat
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;