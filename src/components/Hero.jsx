import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { config } from '../config.jsx';
import { generateResumePDF } from '../utils/resumeGenerator.js';

const roles = [
    'Web Developer',
    'AIML Student',
    'Open Source Contributor',
];

const Hero = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const scrollToProjects = () => {
        if (location.pathname === '/') {
            const el = document.querySelector('#projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/projects');
        }
    };

    return (
        <section id="home" className="flex items-center relative overflow-hidden bg-white pt-20 pb-6 md:min-h-screen md:pt-20 md:pb-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50" />

            <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                    
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full text-left"
                    >
                        {/* Status Badge */}
                        <div className="flex justify-start mb-3">
                            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full text-xs sm:text-sm">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
                                </div>
                                <span className="font-medium text-emerald-700">Open to Internship & Job Opportunities</span>
                            </div>
                        </div>

                        {/* Mobile: Floating image that text wraps around */}
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            src="/hero-profile.png"
                            alt="Haries Hussain"
                            className="lg:hidden float-right ml-4 mb-2 w-32 sm:w-40 rounded-2xl border-2 border-indigo-100 shadow-lg"
                        />

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.1] display-font text-gray-900">
                            <span className="block mb-1">
                                Hi, I'm <span className="text-indigo-600">{config.developer.name}</span>
                            </span>
                            <span className="block h-[1.2em] text-xl sm:text-2xl md:text-3xl lg:text-4xl overflow-hidden text-gray-500 font-medium mt-1">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="block"
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl font-light">
                            {config.aboutMe}
                        </p>

                        {/* Clear the float before buttons */}
                        <div className="clear-both" />

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-start gap-3 mt-4">
                            <button
                                onClick={scrollToProjects}
                                className="group inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-indigo-600 text-white font-semibold text-sm sm:text-base hover:bg-indigo-700 transition-all shadow-md hover:shadow-xl hover:shadow-indigo-600/20"
                            >
                                <span>View My Work</span>
                                <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button
                                onClick={() => generateResumePDF()}
                                className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <HiDownload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                                <span>Download Resume</span>
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-start items-center gap-3 mt-3">
                            {[
                                { href: `https://github.com/${config.social.github}`, icon: <FaGithub className="w-5 h-5" />, label: 'GitHub' },
                                { href: `https://www.linkedin.com/in/${config.social.linkedin}`, icon: <FaLinkedinIn className="w-5 h-5" />, label: 'LinkedIn' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content — Desktop only, full photo with rounded corners */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="w-full hidden lg:flex justify-center"
                    >
                        <img
                            src="/hero-profile.png"
                            alt="Haries Hussain"
                            className="w-full max-w-[500px] rounded-[2rem] border border-indigo-100 shadow-xl"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
