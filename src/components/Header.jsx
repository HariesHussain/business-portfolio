import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiDownload } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config.jsx';
import { generateResumePDF } from '../utils/resumeGenerator.js';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [generating, setGenerating] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const handleDownloadResume = async () => {
        setGenerating(true);
        try {
            await generateResumePDF();
        } catch (e) {
            console.error('Resume generation failed:', e);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled 
                        ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' 
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2"
                        >
                            <Link 
                                to="/"
                                className="text-lg md:text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors display-font"
                            >
                                {config.developer.name}<span className="text-indigo-600">.</span>
                            </Link>
                        </motion.div>

                        <nav className="hidden md:flex items-center space-x-1">
                            {config.NAV_ITEMS.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.href}
                                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                                            isActive(item.href) 
                                                ? 'text-indigo-600' 
                                                : 'text-gray-600 hover:text-indigo-600'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Download Resume CTA */}
                            <motion.button
                                onClick={handleDownloadResume}
                                disabled={generating}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: config.NAV_ITEMS.length * 0.1 }}
                                className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300"
                            >
                                <HiDownload className={`w-4 h-4 ${generating ? 'animate-bounce' : ''}`} />
                                {generating ? 'Generating...' : 'Download Resume'}
                            </motion.button>
                        </nav>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col h-full p-6 pt-20">
                                {config.NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`px-4 py-3.5 text-base font-medium transition-colors border-b border-gray-100 ${
                                            isActive(item.href) 
                                                ? 'text-indigo-600' 
                                                : 'text-gray-600 hover:text-indigo-600'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); handleDownloadResume(); }}
                                    disabled={generating}
                                    className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold disabled:bg-gray-400"
                                >
                                    <HiDownload className="w-4 h-4" />
                                    {generating ? 'Generating...' : 'Download Resume'}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
