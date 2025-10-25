import React, { useState, useEffect } from 'react';

const DevdactylLogo: React.FC = () => (
    <div className="flex items-center gap-2">
        <div className="text-2xl font-bold tracking-tighter hidden sm:block">
            <span>de</span>
            <span className="text-yellow-400 inline-block transform -skew-x-12">V</span>
            <span>dactyl</span>
        </div>
    </div>
);

const Header: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking on a link
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === '#blog') {
            e.preventDefault();
            setView('blog');
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#featured-work' },
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a 
                        href="#" 
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setView('home');
                            setMobileMenuOpen(false);
                        }} 
                        className="cursor-pointer z-50 relative"
                    >
                        <DevdactylLogo />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a 
                                key={link.name}
                                href={link.href} 
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-wide font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button - Desktop */}
                    <a 
                        href="#contact" 
                        className="hidden md:inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Get In Touch
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <nav className="flex flex-col items-center justify-center h-full space-y-8">
                        {navLinks.map(link => (
                            <a 
                                key={link.name}
                                href={link.href} 
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-wide font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 text-lg mt-4"
                        >
                            Get In Touch
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;