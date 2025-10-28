import React, { useState } from 'react';
import type { FAQItem } from '../types';

const faqData: FAQItem[] = [
    {
        question: "What do you actually do?",
        answer: "I’ve probably been asked that more times than my own name. To put it simply, I build digital tools. If your business has a problem or a process that's slow and tedious, I can likely build a website or a piece of software to fix it. Whether it's an e-commerce store, a booking system, or a complex web app, I create solutions that are fast, functional, and designed to grow with your business."
    },
    {
        question: "Why the name 'Devdactyl'?",
        answer: "I was <em>that</em> dinosaur kid. While other girls played with dolls, I was reading about the Jurassic period and collecting fossils. I've got a pterodactyl tooth on my desk right now (yes, really). So 'Devdactyl' is a mashup of 'DEVeloper' and 'pterodactyl'. It's a nod to my childhood obsession. And no, I don't see the irony in naming a tech company after something famously extinct."
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
        answer: "Yes. I've seen it all. Whether your site is slower than a dial-up connection, looks like it was designed in 1998, or is just plain broken, I can help. I'll take a look under the bonnet, diagnose the problems, and give you an honest, jargon-free plan to get it back into shape. No judgment here; the internet is a scary place."
    },
    {
        question: "Do you use AI to build websites?",
        answer: "Yes, but probably not in the way you're thinking. I've spent time under the hood training and annotating AI models, so I know exactly what they're good for: blitzing through the repetitive, boring, grunt work. What they're not good for is taste, strategy, or that gut feeling that a design just works. AI is the shiny new power tool, but a human still needs to draw the blueprint and build the house. And nobody wants to communicate with a Klanger to get things done."
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

const FAQItemComponent: React.FC<{
    item: FAQItem;
    isOpen: boolean;
    onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/20 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full text-left flex justify-between items-center py-6 px-6 hover:bg-white/5 transition-colors duration-300"
                aria-expanded={isOpen}
            >
                <span className={`text-lg md:text-xl font-semibold ${isOpen ? 'text-yellow-400' : 'text-white'}`}>
                    {item.question}
                </span>
                <span className={`faq-icon flex-shrink-0 ml-4 ${isOpen ? 'is-open' : ''}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </span>
            </button>
            <div className={`faq-answer ${isOpen ? 'is-open' : ''}`}>
                 <div className="pb-6 px-6 text-gray-300 prose prose-invert prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-400 prose-em:italic" dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
        </div>
    );
};


const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 lg:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-400 mt-2">The answers you're probably looking for. If not, get in touch!</p>
                </div>
                <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
                    {faqData.map((item, index) => (
                        <FAQItemComponent
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;