import React, { useEffect, useRef } from 'react';
import BrowserMockup from './BrowserMockup';
import type { Project } from '../types';

declare const gsap: any;
declare const ScrollTrigger: any;

const projectsData: Project[] = [
    {
        title: 'Solstice',
        description: 'An underground Irish festival required total operational secrecy until launch day. Devdactyl built an encrypted ticketing platform with time-locked GPS coordinates, high-volume Stripe integration, and anti-scalping measures. The system handled 300+ ticket sales with zero security breaches, maintaining complete location confidentiality until exactly 48 hours before gates opened.',
        imageUrl: 'images/solstice.gif',
        tags: ['Security', 'E-commerce', 'Real-time'],
        direction: 'left',
        isGIF: true,
        challenge: 'The client needed to sell tickets weeks in advance while keeping the festival location completely secret. Standard ticketing platforms could not guarantee this level of security, and the system needed to handle concurrent ticket drops without crashes or data leaks.',
        solution: 'Built a custom platform with server-side AES-256 encryption for GPS data, implementing automated time-locked decryption that triggers exactly 48 hours pre-event. Added device fingerprinting and one-time QR codes to prevent ticket scalping and unauthorized transfers.',
        features: [
            'End-to-end encrypted ticketing with automated time-lock release',
            'Stripe integration optimized for high-concurrency drops (300+ simultaneous users)',
            'One-time-use QR codes with device binding to prevent scalping',
            'Real-time inventory management with Redis caching',
            'Custom admin dashboard for ticket validation and attendance tracking'
        ],
        results: '300+ tickets sold, zero security breaches, 100% location secrecy maintained until scheduled reveal. Client reported smooth operations with no technical issues during the high-traffic launch window.',
        techStack: ['Next.js', 'PostgreSQL', 'AES-256', 'Stripe', 'Redis']
    },
    {
        title: 'Dive Centre Pro',
        description: 'A Grand Cayman dive centre needed a unified platform to replace their fragmented systems. Devdactyl delivered an all-in-one management solution integrating real-time ocean conditions, customer records, equipment inventory, and retail POS. The system now processes 200+ bookings monthly with automated customer communications and live weather data.',
        imageUrl: 'images/diveshop.png',
        tags: ['SaaS', 'API Integration', 'Business Tools'],
        direction: 'right',
        challenge: 'The dive centre was juggling spreadsheets, paper logs, and separate systems for bookings, retail, and customer data. They needed everything integrated but could not afford downtime during their busy season. Staff had varying technical skill levels.',
        solution: 'Built a custom web application integrating NOAA weather APIs for real-time dive conditions, automated booking confirmations via email/SMS, and a simplified POS system designed specifically for dive shop workflows. Implemented gradual rollout with staff training.',
        features: [
            'Real-time ocean conditions API with weather alerts',
            'Integrated booking system with automated customer notifications',
            'Equipment inventory tracking with maintenance schedules',
            'Custom POS for retail and course sales',
            'Customer database with dive certification tracking'
        ],
        results: '200+ bookings processed monthly, 40% reduction in administrative time, zero data migration issues. Staff reported significantly improved workflow efficiency.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Twilio']
    },
    {
        title: 'Sonny\'s Snaps',
        description: 'A professional photographer needed more than a portfolio - they needed a client management system. Devdactyl created a visually stunning site with GSAP 3D animations, secure client galleries for proofing, and an integrated print store. The platform now handles client proofing workflows and generates additional revenue through automated print fulfillment.',
        imageUrl: 'images/sonsnap.png',
        tags: ['Portfolio', 'Client Portal', 'E-commerce'],
        direction: 'left',
        challenge: 'The photographer was spending hours emailing proofs back and forth, manually tracking print orders, and struggling to stand out in a saturated market. They needed a memorable portfolio that also streamlined their business operations.',
        solution: 'Built a high-impact portfolio using GSAP for smooth 3D transitions and parallax effects. Created a private client portal with watermarked galleries, approval workflows, and direct-to-print ordering via Stripe. Used AWS S3 for high-res image storage and CDN delivery.',
        features: [
            'GSAP-powered 3D animations and smooth parallax scrolling',
            'Secure client portal with watermarked proofing galleries',
            'Integrated print store with automated fulfillment',
            'Photo selection and approval workflow',
            'High-performance image delivery via AWS CloudFront'
        ],
        results: 'Client reported 60% time savings on proofing workflows and added a new revenue stream through print sales. Site receives frequent compliments from wedding clients.',
        techStack: ['React', 'GSAP', 'Stripe', 'AWS S3', 'CloudFront']
    },
    {
        title: 'Vinyl Vault Records',
        description: 'A 92-year-old vinyl collector with 40 years of market experience needed to take his business online without losing his personal touch. Devdactyl built a custom e-commerce platform with simplified inventory management, capturing decades of expertise in a modern shopping experience. The store processed €12,000 in sales within the first three months.',
        imageUrl: 'images/george.png',
        tags: ['E-commerce', 'Custom CMS', 'Legacy Migration'],
        direction: 'right',
        challenge: 'Four decades of handwritten records, index cards, and institutional knowledge needed digitizing. The owner had zero technical background but deep expertise in rare vinyl. The system had to be dead simple while handling complex inventory (condition grading, rarity, pricing variations).',
        solution: 'Created a custom Django CMS with an interface as simple as a spreadsheet. Built one-click order processing, automated inventory updates, and a public-facing store that showcases the owner\'s curated collection. Personally trained the owner over video calls.',
        features: [
            'Custom CMS designed for non-technical users',
            'Specialized vinyl inventory fields (condition, pressing, rarity)',
            'Automated Stripe checkout with shipping calculations',
            'One-click order fulfillment workflow',
            'Responsive design optimized for mobile browsing'
        ],
        results: '€12,000 in sales first 3 months, 40 years of inventory successfully digitized, owner confidently manages the system independently. Customers frequently mention the site\'s ease of use.',
        techStack: ['Django', 'Python', 'PostgreSQL', 'Stripe', 'Bootstrap']
    },
    {
        title: 'Bang For Your Buck',
        description: 'A side project that became a local hit - a crowdsourced platform tracking pint prices across Ireland. Built with real-time updates, geolocation verification, and community moderation to maintain data accuracy. Currently tracking prices at 200+ venues with active daily submissions from the community.',
        imageUrl: 'images/bangbuck.png',
        tags: ['Real-time', 'Community', 'Mobile-first'],
        direction: 'left',
        isGIF: true,
        challenge: 'Creating a crowdsourced database that stays current and accurate without becoming spam-filled or outdated. Needed to verify submissions were legitimate while keeping the barrier to entry low for contributors.',
        solution: 'Implemented geolocation verification (users must be physically near the venue to submit), Supabase real-time subscriptions for instant updates, and simple community upvote/downvote moderation. Built mobile-first with Mapbox for venue discovery.',
        features: [
            'Real-time price updates via Supabase subscriptions',
            'Geolocation verification for submission authenticity',
            'Community moderation with upvote/downvote system',
            'Interactive map with Mapbox for venue discovery',
            'PWA support for mobile installation'
        ],
        results: '200+ venues tracked, daily active submissions, became popular among Irish college students. Demonstrates ability to build viral community features and handle real-time data at scale.',
        techStack: ['Next.js', 'Supabase', 'Mapbox', 'PostgreSQL', 'Vercel']
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