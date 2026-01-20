
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Advanced Glitch Text component that handles RGB splitting and horizontal shifting.
 */
const AdvancedGlitch: React.FC<{ text: string; className?: string; intensity?: 'low' | 'high' }> = ({ 
  text, 
  className, 
  intensity = 'low' 
}) => {
  const [glitchState, setGlitchState] = useState(0);

  useEffect(() => {
    const triggerGlitch = () => {
      setGlitchState(Math.floor(Math.random() * 3) + 1);
      setTimeout(() => setGlitchState(0), Math.random() * 200 + 50);
    };

    const timeout = setTimeout(triggerGlitch, Math.random() * (intensity === 'high' ? 800 : 2500) + 500);
    return () => clearTimeout(timeout);
  }, [glitchState, intensity]);

  return (
    <div className={`relative inline-block ${className} ${glitchState > 0 ? 'glitch-active' : ''}`}>
      <span className="relative z-10">{text}</span>
      {glitchState > 0 && (
        <>
          <span 
            className="absolute top-0 left-0 text-red-500 mix-blend-screen opacity-80 z-0 select-none"
            style={{ transform: `translate(${Math.random() * 15 - 7.5}px, ${Math.random() * 6 - 3}px)` }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 text-cyan-400 mix-blend-screen opacity-80 z-0 select-none"
            style={{ transform: `translate(${Math.random() * 15 - 7.5}px, ${Math.random() * 6 - 3}px)` }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

const TerminalShell: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const logs = [
    "> INITIATING SYSTEM_RECOVERY...",
    "> SEARCHING FOR CLUSTER_INDEX: 0x404",
    "> ERROR: PATH_NOT_FOUND_IN_ROOT",
    "> ATTEMPTING_RECONNECT... FAILED",
    "> WARNING: DATA_CORRUPTION_DETECTED",
    "> LOCATION: WEXFORD_EDGE_NODE_01",
    "> ACCESS_DENIED: RESOURCE_DELETED",
    "> SHUTTING DOWN NON-ESSENTIAL SERVICES..."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < logs.length) {
        setLines(prev => [...prev, logs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] md:text-xs text-yellow-400/70 space-y-1">
      {lines.map((line, idx) => (
        <div key={idx} className="flex gap-2">
          <span className="opacity-40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
          <span>{line}</span>
        </div>
      ))}
      <div className="flex gap-2">
         <span className="opacity-40">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
         <span className="animate-pulse bg-yellow-400 w-2 h-4 inline-block"></span>
      </div>
    </div>
  );
};

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#050505] selection:bg-yellow-400 selection:text-black">
      {/* Background FX */}
      <div className="noise-bg opacity-[0.06]" />
      <div className="scanline opacity-25 pointer-events-none" />
      
      {/* CRT Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.95)]" />
      
      {/* Glitch Grid Lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        {/* Brand Hint */}
        <div className="mb-12 opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default">
           <div className="text-xl font-bold tracking-tighter text-white font-sans">
              <span>de</span>
              <span className="text-yellow-400 inline-block transform -skew-x-12">V</span>
              <span>dactyl</span>
              <span className="text-[10px] font-mono ml-3 border border-yellow-400/30 text-yellow-400 px-2 py-0.5 rounded uppercase">Core_Bypassed</span>
          </div>
        </div>

        {/* 404 Title */}
        <div className="mb-6 relative">
            <AdvancedGlitch 
                text="404" 
                intensity={isHovered ? 'high' : 'low'}
                className="text-[10rem] md:text-[18rem] font-black text-white leading-none tracking-tighter select-none font-sans" 
            />
            <div className="absolute -top-6 -right-10 md:-top-10 md:-right-16">
                <span className="bg-red-600 text-white px-3 py-1 text-xs md:text-sm font-mono font-bold uppercase -rotate-6 inline-block shadow-lg border-2 border-white/20">
                    System Failure
                </span>
            </div>
        </div>

        {/* Content Box */}
        <div className="glass px-8 py-10 rounded-none max-w-xl w-full mb-12 border-white/10 relative overflow-hidden group shadow-2xl shadow-black">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400/60" />
            
            <h2 className="text-xl md:text-2xl font-mono font-bold mb-6 flex items-center justify-center gap-3 text-yellow-400 uppercase tracking-widest">
                <span className="animate-ping w-2 h-2 rounded-full bg-red-500"></span>
                Route_Not_Resolved
            </h2>
            
            <p className="text-gray-400 mb-8 text-sm md:text-base font-light tracking-wide leading-relaxed">
                The requested segment could not be retrieved from the main cluster. 
                Internal routing protocols have encountered a terminal exception.
            </p>

            {/* Terminal Window */}
            <div className="text-left bg-black/80 p-5 rounded-sm border border-white/10 shadow-inner overflow-hidden min-h-[180px] relative">
                <div className="absolute top-2 right-3 flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10"></div>
                  <div className="w-2 h-2 rounded-full bg-white/10"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400/20"></div>
                </div>
                <TerminalShell />
            </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-6">
            <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate('/')}
                className="group relative px-12 py-4 bg-yellow-400 text-black font-black rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_0_30px_rgba(250,204,21,0.2)]"
            >
                <span className="relative z-10 uppercase tracking-widest text-sm">Force Reboot (Home)</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity glitch-active" />
            </button>
            
            <button 
                onClick={() => window.history.back()}
                className="px-12 py-4 border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all uppercase tracking-widest text-xs font-bold rounded-sm text-gray-400 hover:text-white flex items-center gap-2 backdrop-blur-sm"
            >
                <span>[ Volver ]</span>
            </button>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-white/10 space-y-1.5 hidden lg:block uppercase tracking-tighter">
        <div className="flex justify-between gap-4"><span>STATUS:</span> <span className="text-red-500/50">DISCONNECTED</span></div>
        <div className="flex justify-between gap-4"><span>UPLINK:</span> <span>NULL_REF</span></div>
        <div className="flex justify-between gap-4"><span>BUFFER:</span> <span>OVERFLOW</span></div>
      </div>
      
      <div className="absolute top-10 right-10 font-mono text-[10px] text-white/10 text-right hidden lg:block uppercase tracking-tighter">
        <div>COORDS: 52.3369° N, 6.4633° W</div>
        <div>TIMESTAMP: {new Date().getTime()}</div>
        <div>SESSION_ID: 0x404_VOID</div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/5 tracking-[0.6em] uppercase">
        Devdactyl Industrial Digital Core v2.5.4
      </div>
    </div>
  );
};

export default NotFound;
