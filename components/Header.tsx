
import React, { useState, useEffect } from 'react';

const DevdactylLogo: React.FC = () => (
    <div className="text-2xl font-bold tracking-tighter">
        <span>de</span>
        <span className="text-yellow-400 inline-block transform -skew-x-12">V</span>
        <span>dactyl</span>
    </div>
);

const Header: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['Services', 'About', 'Contact'];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-[#333333]' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); }} className="cursor-pointer">
                    <DevdactylLogo />
                </a>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-wide">
                            {link}
                        </a>
                    ))}
                     <a href="#blog" onClick={(e) => { e.preventDefault(); setView('blog'); }} className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-wide">
                        Blog
                    </a>
                </nav>
                <a href="#contact" className="hidden md:inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">
                    Get In Touch
                </a>
            </div>
        </header>
    );
};

export default Header;