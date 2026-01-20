import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPostsData } from './blogData';
import ShareButtons from './ShareButtons';
import type { BlogPost } from '../types';

declare const gsap: any;

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

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = blogPostsData.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (!post) return;

        // Animate in
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo('.blog-post-hero',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        ).fromTo('.blog-post-content',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
        );
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
                    <button 
                        onClick={() => navigate('/blog')}
                        className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-md hover:bg-yellow-500"
                    >
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    const pageUrl = `https://devdactyl.ie/blog/${post.slug}`;
    const imageUrl = post.imageUrl.startsWith('http') 
        ? post.imageUrl 
        : `https://devdactyl.ie/${post.imageUrl}`;

    const relatedPosts = blogPostsData
        .filter(p => p.slug !== post.slug && p.category === post.category)
        .slice(0, 2);

    // If we don't have 2 related posts from same category, grab some random ones
    if (relatedPosts.length < 2) {
        const additionalPosts = blogPostsData
            .filter(p => p.slug !== post.slug && !relatedPosts.includes(p))
            .sort(() => 0.5 - Math.random())
            .slice(0, 2 - relatedPosts.length);
        relatedPosts.push(...additionalPosts);
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | Devdactyl Blog</title>
                <meta name="description" content={post.excerpt} />
                <meta name="keywords" content={`${post.category}, web development, wexford, ireland, ${post.title.toLowerCase()}`} />
                
                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={imageUrl} />
                <meta property="article:published_time" content={new Date(post.date).toISOString()} />
                <meta property="article:author" content={post.author} />
                <meta property="article:section" content={post.category} />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={imageUrl} />
                
                <link rel="canonical" href={pageUrl} />
                
                {/* Structured Data for Blog Post */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt,
                        "image": imageUrl,
                        "datePublished": new Date(post.date).toISOString(),
                        "author": {
                            "@type": "Person",
                            "name": post.author
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Devdactyl",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://devdactyl.ie/images/desk.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": pageUrl
                        }
                    })}
                </script>
            </Helmet>

            <article>
                {/* Hero Section */}
                <header className="blog-post-hero relative h-[60vh] min-h-[450px] w-full flex items-end text-white ken-burns-container">
                    <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="ken-burns-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                    <div className="relative z-10 p-6 md:p-12 max-w-4xl mx-auto w-full">
                        <span className="text-sm font-semibold text-yellow-400 uppercase">{post.category}</span>
                        <h1 className="text-4xl md:text-6xl font-black mt-2 mb-4 leading-tight">{post.title}</h1>
                        <div className="text-sm text-gray-400">
                            <span>By {post.author}</span> &bull; <span>{post.date}</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="blog-post-content bg-black">
                    <div className="container mx-auto px-6 pt-12 pb-16 md:pb-24">
                        <div className="max-w-3xl mx-auto">
                            <div 
                                className="prose prose-lg prose-invert text-gray-300 max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-yellow-400 hover:prose-a:text-yellow-300" 
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Share Buttons */}
                            <div className="mt-12 pt-8 border-t border-[#333333]">
                                <ShareButtons title={post.title} url={pageUrl} />
                            </div>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-[#333333]">
                                    <h3 className="text-2xl font-bold text-white mb-6">You Might Also Like</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {relatedPosts.map(relatedPost => (
                                            <RelatedPostCard 
                                                key={relatedPost.slug} 
                                                post={relatedPost} 
                                                onClick={() => navigate(`/blog/${relatedPost.slug}`)} 
                                            />
                                        ))}
                                    </div>

                                    {/* View All Posts */}
                                    <div className="mt-8 text-center">
                                        <button
                                            onClick={() => navigate('/blog')}
                                            className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors inline-flex items-center gap-2"
                                        >
                                            View All Posts
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* CTA */}
                            <div className="mt-16 pt-8 border-t border-[#333333]">
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 text-center border border-white/20">
                                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Project?</h3>
                                    <p className="text-gray-400 mb-6">Let's turn your idea into a reality. Get in touch today for a free consultation.</p>
                                    <button
                                        onClick={() => {
                                            navigate('/');
                                            setTimeout(() => {
                                                const contactSection = document.getElementById('contact');
                                                if (contactSection) {
                                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }, 100);
                                        }}
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
        </>
    );
};

export default BlogPostPage;