import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DevdactylLogo: React.FC = () => (
    <div className="text-2xl font-bold tracking-tighter">
        <span>de</span>
        <span className="text-yellow-400 inline-block transform -skew-x-12">V</span>
        <span>dactyl</span>
    </div>
);

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: 'Services', section: 'services' },
        { name: 'About', section: 'about' },
        { name: 'Blog', route: '/blog' },
        { name: 'Contact', section: 'contact' }
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        
        if (link.route) {
            // Navigate to a different route (like /blog)
            navigate(link.route);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (link.section) {
            // Scroll to a section
            if (location.pathname !== '/') {
                // Not on homepage - navigate home first, then scroll
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(link.section);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // Already on homepage - just scroll
                const element = document.getElementById(link.section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        
        if (location.pathname !== '/') {
            // Not on homepage - navigate home first
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Already on homepage - just scroll
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 z-[55] bg-black/95 backdrop-blur-lg"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        // height: '100vh',
                        height: '100dvh',
                    }}
                >
                    <nav className="flex flex-col items-center justify-center h-full space-y-8 px-6">
                        {navLinks.map(link => (
                            <a 
                                key={link.name} 
                                href={link.route || `#${link.section}`}
                                onClick={(e) => handleNavClick(e, link)}
                                className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="#contact" 
                            onClick={handleContactClick}
                            className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg"
                        >
                            Get In Touch
                        </a>
                    </nav>
                </div>
            )}

            <header className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-lg border-b border-[#333333]' : 'bg-transparent'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" onClick={handleLogoClick} className="cursor-pointer relative z-[70]">
                        <DevdactylLogo />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <a 
                                key={link.name} 
                                href={link.route || `#${link.section}`}
                                onClick={(e) => handleNavClick(e, link)}
                                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <a 
                        href="#contact" 
                        onClick={handleContactClick}
                        className="hidden md:inline-block bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Get In Touch
                    </a>

                    {/* Mobile Hamburger/X */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden relative z-[70] text-gray-300 hover:text-yellow-400 transition-colors p-2 -mr-2"
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;