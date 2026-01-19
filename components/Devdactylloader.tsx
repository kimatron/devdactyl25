import React, { useState, useEffect } from 'react';

const DevdactylLoader: React.FC = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[9999]">
            <div className="text-center">
                <div className="font-jetbrains text-5xl md:text-7xl font-black mb-4">
                    <span className="text-white">de</span>
                    <span className="text-yellow-400 inline-block transform -skew-x-12 animate-pulse">V</span>
                    <span className="text-white">dactyl</span>
                </div>
                <div className="font-jetbrains text-yellow-400 text-sm tracking-widest">
                    LOADING{dots}
                </div>
            </div>
        </div>
    );
};

export default DevdactylLoader;