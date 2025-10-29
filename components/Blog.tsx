import React, { useEffect, useRef, useState } from 'react';
import type { BlogPost } from '../types';
import { blogPostsData } from './blogData';

declare const gsap: any;
declare const ScrollTrigger: any;

const RelatedPostCard: React.FC<{ post: BlogPost; onClick: () => void }> = ({ post, onClick }) => (
    <button 
        onClick={onClick} 
        className="group w-full text-left bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg overflow-hidden flex items-center transition-all duration-300 transform hover:scale-[1.02] border border-white/20"
    >
        <img src={post.imageUrl} alt={post.title} className="w-24 h-full md:w-32 object-cover flex-shrink-0" />
        <div className="p-4">
            <span className="text-xs font-semibold text-yellow-400 uppercase">{post.category}</span>
            <h4 className="text-md font-bold text-white mt-1 leading-tight group-hover:text-yellow-300 transition-colors">{post.title}</h4>
        </div>
    </button>
);


export const BlogPostModal: React.FC<{ post: BlogPost; setSelectedPost: (post: BlogPost | null) => void }> = ({ post, setSelectedPost }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef(null);
    const articleContentRef = useRef(null);
    
    useEffect(() => {
        // Animate modal container in ONCE on initial mount
        gsap.fromTo(modalRef.current, 
            { y: '100%' }, 
            { y: '0%', duration: 0.7, ease: 'power3.out' }
        );

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        // Animate content IN whenever the 'post' prop changes
        if (modalRef.current) modalRef.current.scrollTo(0, 0); // Scroll to top on new post

        const tl = gsap.timeline({delay: 0.2});
        tl.fromTo([heroContentRef.current, articleContentRef.current], { opacity: 0 }, { opacity: 1, duration: 0.1 })
          .fromTo(gsap.utils.toArray('.modal-hero-anim'),
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            }
          ).fromTo(articleContentRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.6"
          );

    }, [post]);


    const handleClose = () => {
        gsap.to(modalRef.current, { y: '100%', duration: 0.5, ease: 'power3.in', onComplete: () => setSelectedPost(null) });
    };
    
    const handleSwitchPost = (newPost: BlogPost) => {
        gsap.to([heroContentRef.current, articleContentRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                setSelectedPost(newPost);
            }
        });
    };

    const handleCTAClick = () => {
        gsap.to(modalRef.current, { 
            y: '100%', 
            duration: 0.5, 
            ease: 'power3.in', 
            onComplete: () => {
                setSelectedPost(null);
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    };

    const relatedPosts = blogPostsData
        .filter(p => p.title !== post.title)
        .sort(() => 0.5 - Math.random()) // shuffle
        .slice(0, 2);

    return (
        <div 
            ref={modalRef} 
            className="fixed inset-0 bg-black z-[100] overflow-y-auto"
            aria-modal="true"
            role="dialog"
        >
            <button 
                onClick={handleClose} 
                className="fixed top-5 right-5 z-20 text-white bg-black/50 rounded-full p-2 hover:bg-yellow-400 hover:text-black transition-colors backdrop-blur-sm"
                aria-label="Close article"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0_0_24_24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
                    
            <article>
                {/* Cinematic Hero Section */}
                <header className="relative h-[60vh] min-h-[450px] w-full flex items-end text-white ken-burns-container">
                     <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="ken-burns-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                    <div ref={heroContentRef} className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto w-full">
                        <span className="modal-hero-anim text-sm font-semibold text-yellow-400 uppercase">{post.category}</span>
                        <h1 className="modal-hero-anim text-4xl md:text-6xl font-black mt-2 mb-4 leading-tight">{post.title}</h1>
                        <div className="modal-hero-anim text-sm text-gray-400">
                            <span>By {post.author}</span> &bull; <span>{post.date}</span>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <div ref={articleContentRef} className="bg-black">
                    <div className="container mx-auto px-6 pt-12 pb-16 md:pb-24">
                        <div className="max-w-3xl mx-auto">
                            <div 
                                className="prose prose-lg prose-invert text-gray-300 max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-yellow-400 hover:prose-a:text-yellow-300" 
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            >
                            </div>

                            {relatedPosts.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-[#333333]">
                                    <h3 className="text-2xl font-bold text-white mb-6">You Might Also Like</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {relatedPosts.map(relatedPost => (
                                            <RelatedPostCard 
                                                key={relatedPost.title} 
                                                post={relatedPost} 
                                                onClick={() => handleSwitchPost(relatedPost)} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="mt-16 pt-8 border-t border-[#333333]">
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Project?</h3>
                                    <p className="text-gray-400 mb-6">Let's turn your idea into a reality. Get in touch today for a free consultation.</p>
                                    <button
                                        onClick={handleCTAClick}
                                        className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg"
                                    >
                                        Let's Talk
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export const BlogPostCard: React.FC<{ post: BlogPost; onReadMore: () => void; }> = ({ post, onReadMore }) => {
    return (
        <div className="card-3d-wrapper">
            <button 
                onClick={onReadMore} 
                className="card-3d relative rounded-lg overflow-hidden group w-full h-96 text-left border border-white/20"
            >
                {/* Image */}
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                />
                
                {/* Sliding Content with integrated gradient and blur for readability */}
                <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 ease-in-out translate-y-[calc(100%-8.5rem)] group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm">
                    <span className="text-sm font-semibold text-yellow-400 uppercase">{post.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-4 leading-tight">{post.title}</h3>
                    
                    {/* Content revealed on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out delay-200">
                        <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                        <div className="text-xs text-gray-400 mb-4">
                            <span>By {post.author}</span> &bull; <span>{post.date}</span>
                        </div>
                        <p className="font-semibold text-yellow-400 transition-colors self-start mt-auto">
                            Read More &rarr;
                        </p>
                    </div>
                </div>
                
                <div className="glow-border"></div>
            </button>
        </div>
    );
};


const Blog: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const sectionRef = useRef(null);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;
        
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo((sectionEl as HTMLElement).querySelectorAll('.card-3d-wrapper'),
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <>
            <section id="blog" ref={sectionRef} className="py-20 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Unsolicited Advice</h2>
                        <p className="text-lg text-gray-400 mt-2">Connecting unique experiences to digital solutions.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPostsData.slice(0, 3).map((post, index) => (
                            <BlogPostCard key={index} post={post} onReadMore={() => setSelectedPost(post)} />
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <button
                            onClick={() => setView('blog')}
                            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg"
                        >
                            View All Posts
                        </button>
                    </div>
                </div>
            </section>
            {selectedPost && <BlogPostModal post={selectedPost} setSelectedPost={setSelectedPost} />}
        </>
    );
};

export default Blog;