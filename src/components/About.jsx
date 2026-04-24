import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiLightBulb, HiDownload } from 'react-icons/hi';
import { FaLinkedinIn } from 'react-icons/fa';
import { config } from '../config.jsx';
import { generateResumePDF } from '../utils/resumeGenerator.js';

const About = () => {
    const [projectCount, setProjectCount] = useState('...');

    useEffect(() => {
        fetch(`https://api.github.com/users/${config.social.github}/repos?per_page=100`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const count = data.filter(p => !p.fork && !p.private).length;
                    setProjectCount(count);
                }
            })
            .catch(() => setProjectCount('5+'));
    }, []);

    const stats = [
        { label: 'Certificates', value: config.certificates?.length || 4 },
        { label: 'Projects', value: projectCount },
        { label: 'Technologies', value: '15+' },
    ];

    return (
        <section id="about" className="py-12 md:py-20 bg-white">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-10 md:mb-14">
                    <div className="bg-indigo-50 px-4 py-2 rounded-full mb-4">
                        <div className="flex items-center space-x-2">
                            <HiLightBulb className="w-4 h-4 text-indigo-600" />
                            <span className="text-xs sm:text-sm font-semibold text-indigo-900 uppercase tracking-widest">About</span>
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center display-font">
                        Who I Am
                    </h2>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 md:gap-5 mb-10 md:mb-14 max-w-2xl mx-auto">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-gray-50 border border-gray-100 rounded-xl p-4 md:p-5 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 display-font mb-1">
                                {stat.value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-start">
                    {/* Left: About Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-3 space-y-6"
                    >
                        <div className="space-y-4">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                {config.aboutMe}
                            </p>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                I believe in learning by building. Every project is an opportunity to push boundaries, 
                                explore new technologies, and create something meaningful. I'm particularly drawn to the 
                                intersection of AI and web development — where intelligent systems meet beautiful experiences.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={() => generateResumePDF()}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
                            >
                                <HiDownload className="w-4 h-4" />
                                Download Resume
                            </button>
                            <a
                                href={`https://www.linkedin.com/in/${config.social.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold text-sm hover:bg-gray-200 transition-colors"
                            >
                                <FaLinkedinIn className="w-4 h-4 text-indigo-600" />
                                Connect on LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 space-y-4"
                    >
                        {/* Education Card */}
                        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 md:p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <HiAcademicCap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 display-font">Education</h3>
                                    <p className="text-xs text-gray-500">{config.education.period}</p>
                                </div>
                            </div>
                            <h4 className="text-sm font-semibold text-gray-900 leading-snug mb-1">
                                {config.education.degree}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {config.education.university}
                            </p>
                        </div>

                        {/* Open To Card */}
                        <div className="bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Currently Open To</h3>
                            <div className="space-y-3">
                                {[
                                    'Summer Internships (AI/ML)',
                                    'Web Developer Roles',
                                    'Open Source Collaboration',
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
