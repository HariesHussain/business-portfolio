import React from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { config } from '../config.jsx';

const Experience = () => {
    const experiences = config.experiences || [];
    if (!experiences || experiences.length === 0) return null;

    return (
        <section id="experience" className="py-12 md:py-20 bg-gray-50">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center mb-10 md:mb-14">
                    <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
                        <div className="flex items-center space-x-2">
                            <HiBriefcase className="w-4 h-4" />
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest">Experience</span>
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center display-font">
                        My Journey
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-1/2" />

                    <div className="space-y-8 md:space-y-12">
                        {experiences.map((exp, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="absolute left-3 md:left-1/2 top-0 md:top-6 md:-translate-x-1/2 z-10">
                                        <div className="w-3 h-3 bg-indigo-600 rounded-full border-[3px] border-gray-50" />
                                    </div>
                                    <div className="hidden md:block w-1/2" />
                                    <div className="ml-8 md:ml-0 md:w-1/2">
                                        <div className="bg-white border border-gray-200 p-4 sm:p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 display-font">
                                                    {exp.position}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-full w-fit">
                                                    <HiCalendar className="w-3 h-3" />
                                                    <span>{exp.period}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 mb-3">
                                                <p className="text-sm text-gray-700 font-semibold">{exp.company}</p>
                                                {exp.location && (
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <HiLocationMarker className="w-3 h-3 text-gray-400" />
                                                        <span>{exp.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {exp.description && (
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{exp.description}</p>
                                            )}

                                            {exp.technologies?.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                                                    {exp.technologies.map((tech, idx) => (
                                                        <span key={idx} className="text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
