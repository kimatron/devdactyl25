import React, { useState, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 z-[9999] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
        />
    );
};

export default ScrollProgress;