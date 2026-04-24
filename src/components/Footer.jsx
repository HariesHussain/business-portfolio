import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiArrowRight } from 'react-icons/hi';
import { config } from '../config.jsx';

const email = 'shaikharieshussain09@gmail.com';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            {/* CTA Section */}
            <div className="py-16 md:py-24">
                <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <div className="space-y-3">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 display-font">
                                Let's Build Something
                            </h2>
                            <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                                Looking for internships, collaborations, or just want to say hi? 
                                My inbox is always open.
                            </p>
                        </div>

                        {/* CTA — direct gmail link so it always works */}
                        <a
                            href={config.contactInfo.find(c => c.label === 'Email')?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-sm sm:text-base hover:bg-indigo-700 transition-colors"
                        >
                            <HiMail className="w-5 h-5" />
                            <span>Say Hello</span>
                            <HiArrowRight className="w-4 h-4" />
                        </a>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3 pt-2">
                            {[
                                { href: `https://github.com/${config.social.github}`, icon: <FaGithub className="w-5 h-5" />, label: 'GitHub' },
                                { href: `https://www.linkedin.com/in/${config.social.linkedin}`, icon: <FaLinkedinIn className="w-5 h-5" />, label: 'LinkedIn' },
                                { href: config.contactInfo.find(c => c.label === 'Email')?.link, icon: <HiMail className="w-5 h-5" />, label: 'Email' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100 bg-gray-50 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <p className="text-xs text-gray-400">
                            © {new Date().getFullYear()} {config.developer.name}.
                        </p>
                        <p className="text-xs text-gray-400">
                            React · TailwindCSS
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
