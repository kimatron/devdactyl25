import React, { useEffect, useRef } from 'react';
import type { Service } from '../types';

declare const gsap: any;
declare const ScrollTrigger: any;

const WebDevIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
);
const SoftwareDevIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);
const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
    </svg>
);
const DesignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);
const AnimationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);


const servicesData: Service[] = [
    {
        title: 'Web Development',
        icon: WebDevIcon,
        items: [
            'High-performance websites designed to tell your story and convert visitors into customers.',
            'Robust e-commerce platforms that make selling online simple and scalable.',
            'Intuitive content management systems (CMS) that put you in control of your content.',
            'Fully responsive experiences, flawlessly delivered on every device.'
        ],
        imageUrl: 'https://picsum.photos/seed/abstractweb/1024/768',
    },
    {
        title: 'Software Development',
        icon: SoftwareDevIcon,
        items: [
            'Custom applications engineered to solve your specific business challenges.',
            'Automated workflows and internal tools to boost efficiency and save time.',
            'Seamless API integrations to connect your disparate systems.',
            'Scalable, secure, and maintainable backend architecture.'
        ],
        imageUrl: 'https://picsum.photos/seed/abstractcode/1024/768',
    },
    {
        title: 'UX/UI Design',
        icon: DesignIcon,
        items: [
            'User-centric designs that are both beautiful and incredibly easy to navigate.',
            'Logical information architecture that guides users effortlessly to their goals.',
            'Visually stunning interfaces that embody your brand’s quality and personality.',
            'Comprehensive wireframing, prototyping, and user testing for a perfect final product.'
        ],
        imageUrl: 'https://picsum.photos/seed/abstractui/1024/768',
    },
    {
        title: 'Creative Animation',
        icon: AnimationIcon,
        items: [
            'Captivating animations that bring your brand’s story to life.',
            'Meaningful, interactive elements that delight users and encourage exploration.',
            'Polished motion design that adds a layer of professional sophistication.',
            'High-performance animations using GSAP for a smooth, jank-free experience.'
        ],
        imageUrl: 'https://picsum.photos/seed/abstractmotion/1024/768',
    },
    {
        title: 'Cloud Services',
        icon: CloudIcon,
        items: [
            'Secure, scalable, and reliable cloud hosting solutions that grow with you.',
            'Proactive maintenance and monitoring to ensure maximum uptime and security.',
            'CI/CD pipelines for automated, fast, and dependable deployments.',
            'Strategic consulting to identify the optimal cloud architecture for your needs.'
        ],
        imageUrl: 'https://picsum.photos/seed/abstractcloud/1024/768',
    }
];

const Services: React.FC = () => {
    const component = useRef<HTMLElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(".panel") as HTMLElement[];
            let images = gsap.utils.toArray(".service-image") as HTMLElement[];

            // Main horizontal scroll for the whole container
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (panels.length - 1),
                    end: () => "+=" + (slider.current ? slider.current.offsetWidth : 0),
                }
            });

            // Vertical parallax for the images to create the "staggered" scroll effect
            gsap.to(images, {
                yPercent: -33, // Image is 150% tall, so we move it up by 33% of its height to reveal the rest
                ease: "none",
                scrollTrigger: {
                    trigger: slider.current,
                    scrub: 1,
                    end: () => "+=" + (slider.current ? slider.current.offsetWidth : 0),
                }
            });

        }, component);
        return () => ctx.revert();
    }, []);


    return (
        <section ref={component} id="services" className="overflow-hidden">
            <div className="container mx-auto px-6 text-center pt-20 lg:pt-32 pb-12">
                <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Our Expertise</h2>
                <p className="text-lg text-gray-400 mt-2 max-w-xl mx-auto">We turn ambitious ideas into brilliant digital solutions.</p>
            </div>
            
            <div ref={slider} className="relative h-screen flex w-[500%]">
                {servicesData.map((service) => (
                    <div key={service.title} className="panel w-screen h-full flex justify-center items-center px-6 relative">
                        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center w-full max-w-6xl">
                             {/* Left Column: Text */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <service.icon className="w-10 h-10 text-yellow-400 flex-shrink-0" />
                                    <h3 className="font-jetbrains text-4xl font-bold text-white tracking-tighter">{service.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {service.items.map(item => (
                                        <li key={item} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-lg text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Right Column: Image with Parallax Effect */}
                            <div className="h-80 lg:h-96 rounded-lg shadow-2xl overflow-hidden">
                                <img 
                                    src={service.imageUrl} 
                                    alt={service.title}
                                    className="service-image w-full h-[150%] object-cover" 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;