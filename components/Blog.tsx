// Update Blog.tsx to use navigate instead of modal
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogPost } from '../types';
import { blogPostsData } from './blogData';

declare const gsap: any;
declare const ScrollTrigger: any;

export const BlogPostCard: React.FC<{ post: BlogPost; onReadMore: () => void; }> = ({ post, onReadMore }) => {
    return (
        <div className="card-3d-wrapper">
            <button 
                onClick={onReadMore} 
                className="card-3d relative rounded-lg overflow-hidden group w-full h-96 text-left border border-white/20"
            >
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                />
                
                <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 ease-in-out translate-y-[calc(100%-8.5rem)] group-hover:translate-y-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm">
                    <span className="text-sm font-semibold text-yellow-400 uppercase">{post.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-4 leading-tight">{post.title}</h3>
                    
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

const Blog: React.FC = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();

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
        <section id="blog" ref={sectionRef} className="py-20 lg:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Musings<span className="text-yellow-400">.</span></h2>
                    <p className="text-lg text-gray-400 mt-2">Connecting unique experiences to digital solutions.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPostsData.slice(0, 3).map((post) => (
                        <BlogPostCard 
                            key={post.slug} 
                            post={post} 
                            onReadMore={() => navigate(`/blog/${post.slug}`)} 
                        />
                    ))}
                </div>
                <div className="text-center mt-16">
                    <button
                        onClick={() => navigate('/blog')}
                        className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                        View All Posts
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Blog;