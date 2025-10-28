
import React from 'react';

const DevdactylLogo: React.FC = () => (
    <div className="text-2xl font-bold tracking-tighter">
        <span>de</span>
        <span className="text-yellow-400 inline-block transform -skew-x-12">V</span>
        <span>dactyl</span>
    </div>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-[#333333]">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <DevdactylLogo />
                        <p className="text-gray-500 mt-2 text-sm">Building digital solutions to human problems.</p>
                        <p className="text-gray-500 text-sm">A creative studio by Kim Hanlon</p>
                    </div>
                    <div className="text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} Devdactyl. All Rights Reserved.</p>
                        <p>Wexford, Ireland | Servicing clients in Ireland, the Cayman Islands & beyond.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;