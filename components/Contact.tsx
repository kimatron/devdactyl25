import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        
        try {
            // Option 1: Using Formspree (recommended - sign up at formspree.io for free)
            // Replace YOUR_FORM_ID with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/xvgvooqr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Failed to send message. Please email directly: kim@devdactyl.ie');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };
    
    return (
        <section id="contact" className="py-20 lg:py-32">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-jetbrains text-4xl lg:text-5xl font-black text-white">Start a Project</h2>
                    <p className="text-lg text-gray-400 mt-2">Have a project in mind or just have a question? We'd love to hear from you.</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12 text-gray-300">
                        <a href="mailto:kim@devdactyl.ie" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span>kim@devdactyl.ie</span>
                        </a>
                        <a href="tel:+353894807998" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>+353 89 480 7998</span>
                        </a>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    required 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    autoComplete="name" 
                                    disabled={status === 'sending'}
                                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 focus:bg-white/10 transition disabled:opacity-50" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    required 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    autoComplete="email" 
                                    disabled={status === 'sending'}
                                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 focus:bg-white/10 transition disabled:opacity-50" 
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                            <textarea 
                                name="message" 
                                id="message" 
                                rows={5} 
                                required 
                                value={formData.message} 
                                onChange={handleChange} 
                                disabled={status === 'sending'}
                                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 focus:bg-white/10 transition disabled:opacity-50"
                            ></textarea>
                        </div>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <div className="bg-green-500/10 border border-green-500/50 rounded-md p-4 text-green-400">
                                ✓ Message sent successfully! We'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 text-red-400">
                                ✗ {errorMessage}
                            </div>
                        )}

                        <div className="text-center">
                            <button 
                                type="submit" 
                                disabled={status === 'sending'}
                                className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;