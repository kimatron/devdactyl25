import React, { useState, useEffect } from 'react';

const SkeletonProject: React.FC = () => (
  <div className="animate-pulse">
    {/* Browser mockup skeleton */}
    <div className="bg-white/5 rounded-xl overflow-hidden mb-6">
      <div className="h-10 bg-white/10 border-b border-white/5" />
      <div className="aspect-video bg-white/5" />
    </div>
    {/* Text skeleton */}
    <div className="space-y-3">
      <div className="h-4 bg-white/5 rounded w-20" />
      <div className="h-8 bg-white/5 rounded w-3/4" />
      <div className="h-4 bg-white/5 rounded w-full" />
      <div className="h-4 bg-white/5 rounded w-5/6" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-16 bg-white/5 rounded-full" />
        <div className="h-6 w-20 bg-white/5 rounded-full" />
        <div className="h-6 w-24 bg-white/5 rounded-full" />
      </div>
    </div>
  </div>
);

const SkeletonService: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-72 bg-white/5 rounded-lg mb-6" />
    <div className="space-y-2">
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-4 bg-white/5 rounded w-full" />
      <div className="h-4 bg-white/5 rounded w-5/6" />
    </div>
  </div>
);

const SmoothPageLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Wait for critical resources
        await Promise.all([
          document.fonts.ready,
          new Promise<void>(resolve => {
            if (typeof (window as any).gsap !== 'undefined') {
              resolve();
            } else {
              // Fallback - don't wait forever
              setTimeout(() => resolve(), 300);
            }
          })
        ]);
        
        // Mark as ready
        setIsReady(true);
        
        // Start fade-in after tiny delay
        requestAnimationFrame(() => {
          setFadeIn(true);
        });
      } catch (err) {
        console.error('Loading error:', err);
        // Fail gracefully
        setIsReady(true);
        setFadeIn(true);
      }
    };

    prepare();
  }, []);

  return (
    <div 
      className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      style={{ minHeight: '100vh' }}
    >
      {isReady ? children : (
        <div className="min-h-screen">
          {/* Skeleton content - matches actual layout */}
          <div className="h-20 bg-white/5" /> {/* Header skeleton */}
          <div className="min-h-screen" /> {/* Hero skeleton (lets actual particles show through) */}
        </div>
      )}
    </div>
  );
};

// Export skeletons for use in individual sections
export { SkeletonProject, SkeletonService };
export default SmoothPageLoader;