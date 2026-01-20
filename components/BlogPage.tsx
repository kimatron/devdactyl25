// Update BlogPage.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogPostsData } from './blogData';
import { BlogPostCard } from './Blog';

declare const gsap: any;
declare const ScrollTrigger: any;

const BlogPage: React.FC = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        const sectionEl = sectionRef.current;
        if (!sectionEl) return;
        
        gsap.registerPlugin(ScrollTrigger);

        setTimeout(() => {
            gsap.fromTo((sectionEl as HTMLElement).querySelectorAll('.card-3d-wrapper'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: 'top 90%',
                    }
                }
            );
        }, 100);

    }, []);

    return (
        <>
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center ken-burns-container">
                <img 
                    src="/images/desk4.png" 
                    alt="A product shot laptop with devdactyl logo on screen" 
                    className="ken-burns-image"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 p-6">
                     <h1 className="font-jetbrains text-4xl lg:text-6xl font-black text-white">Unsolicited Advice</h1>
                     <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">You don't have to take it, but it's worth a look</p>
                </div>
            </section>

            <section id="blog-page" ref={sectionRef} className="py-20 lg:py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPostsData.map((post) => (
                            <BlogPostCard 
                                key={post.slug} 
                                post={post} 
                                onReadMore={() => navigate(`/blog/${post.slug}`)} 
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPage;