
import React, { useRef } from 'react';

interface BrowserMockupProps {
  imageUrl: string;
  title: string;
  projectUrl?: string;
  isGIF?: boolean;
}

const BrowserMockup: React.FC<BrowserMockupProps> = ({ imageUrl, title, projectUrl, isGIF }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Note: For long screenshots, this creates a "scroll-on-hover" effect
  // which is great for showing full web pages without consuming vertical space
  const handleMouseEnter = () => {
    if (scrollRef.current) {
      const scrollHeight = scrollRef.current.scrollHeight;
      const clientHeight = scrollRef.current.clientHeight;
      const scrollDist = scrollHeight - clientHeight;
      
      // @ts-ignore - GSAP is global from index.html
      window.gsap.to(scrollRef.current, {
        scrollTop: scrollDist,
        duration: 4,
        ease: "power2.inOut"
      });
    }
  };

  const handleMouseLeave = () => {
    if (scrollRef.current) {
      // @ts-ignore
      window.gsap.to(scrollRef.current, {
        scrollTop: 0,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="relative group w-full max-w-2xl mx-auto">
      {/* Outer Shadow & Glow */}
      <div className="absolute -inset-4 bg-yellow-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
      
      {/* Browser Container */}
      <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
        
        {/* Browser Header */}
        <div className="h-10 bg-[#252525] border-b border-white/5 flex items-center px-4 gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm shadow-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm shadow-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm shadow-green-500/20" />
          </div>
          
          <div className="flex-1 max-w-md mx-auto h-6 bg-black/30 rounded-md border border-white/5 flex items-center px-3 justify-between">
            <span className="text-[10px] text-gray-500 font-jetbrains truncate">
              devdactyl.ie/projects/{title.toLowerCase().replace(/\s+/g, '-')}
            </span>
            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>

        {/* Browser Viewport */}
        <div 
          ref={scrollRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="aspect-video w-full overflow-hidden bg-[#0a0a0a] relative mockup-scroll cursor-ns-resize"
        >
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
          
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Badge for GIF */}
          {isGIF && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-black font-jetbrains font-bold text-[10px] px-2 py-1 rounded shadow-lg animate-pulse">
              LIVE PREVIEW
            </div>
          )}
        </div>
      </div>

      {/* Reflection effect */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-yellow-400/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default BrowserMockup;
