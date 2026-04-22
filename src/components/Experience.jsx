import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { config } from '../config.jsx';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, scale: 0.8, rotateX: 15 },
    show: {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const Experience = () => {
    const experiences = config.experiences || [];
    const shouldReduceMotion = useReducedMotion();

    if (!experiences || experiences.length === 0) {
        return null;
    }

    // Create cross pattern layout
    const getCrossPosition = (index, total) => {
        if (total === 1) return 'center';
        if (total === 2) {
            return index === 0 ? 'left' : 'right';
        }
        // For 3+ items, create cross pattern
        if (index === 0) return 'center'; // Center item
        if (index === 1) return 'left'; // Left side
        if (index === 2) return 'right'; // Right side
        if (index === 3) return 'top'; // Top
        return 'bottom'; // Bottom
    };

    return (
        <section id="experience" className="py-16 md:py-24 relative overflow-hidden" style={{ transform: 'translateZ(0)', willChange: 'scroll-position' }}>
            {/* Cinematic background effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-transparent" />
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
                }} />
            </div>

            {/* Film grain effect */}
            <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px'
            }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "0px" }}
                    className="w-full"
                >
                    <motion.div 
                        variants={itemAnimation} 
                        className="flex items-center gap-2 mb-12 sm:mb-16 justify-center"
                    >
                        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-sm shadow-lg">
                            <HiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                            <span className="text-xs sm:text-sm font-semibold text-white/80">Work Experience</span>
                        </div>
                    </motion.div>

                    {/* Cinematic Cross Box Grid */}
                    <div 
                        className="relative max-w-7xl mx-auto"
                        style={{ 
                            perspective: '1500px',
                            perspectiveOrigin: 'center center'
                        }}
                    >
                        {/* Cross Pattern Grid */}
                        <div className={`grid grid-cols-1 ${experiences.length === 1 ? 'max-w-2xl mx-auto' : experiences.length === 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-3'} gap-4 sm:gap-6 md:gap-8 items-stretch justify-items-center`}>
                            {experiences.map((exp, index) => {
                                const position = getCrossPosition(index, experiences.length);
                                const isCenter = position === 'center';
                                const isLeft = position === 'left';
                                const isRight = position === 'right';
                                const isTop = position === 'top';
                                const isBottom = position === 'bottom';

                                // We remove fixed aspect ratios to prevent text overflow and allow elements to stack naturally
                                const heightClass = 'h-full';
                                
                                // 3D transforms for cinematic depth
                                const getTransform = () => {
                                    if (isCenter) return { rotateY: 0, translateZ: 0 };
                                    if (isLeft) return { rotateY: -8, translateZ: -30 };
                                    if (isRight) return { rotateY: 8, translateZ: -30 };
                                    if (isTop) return { rotateX: -8, translateZ: -30 };
                                    if (isBottom) return { rotateX: 8, translateZ: -30 };
                                    return { rotateY: 0, translateZ: 0 };
                                };

                                const transform = getTransform();
                                
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemAnimation}
                                        className={`relative group ${isCenter ? (experiences.length === 1 ? 'md:col-span-1' : 'md:col-span-3 md:row-span-1') : 'md:col-span-1'} w-full h-full`}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            gridColumn: isCenter ? (experiences.length === 1 ? 'auto' : '1 / -1') : 'auto',
                                            gridRow: experiences.length > 2 ? (isTop ? '1' : isBottom ? '3' : '2') : 'auto',
                                            willChange: 'transform',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden'
                                        }}
                                        whileHover={shouldReduceMotion ? {} : {
                                            rotateY: transform.rotateY * 1.2,
                                            rotateX: transform.rotateX * 1.2,
                                            translateZ: 40,
                                            scale: 1.05,
                                            transition: { duration: 0.4, ease: "easeOut" }
                                        }}
                                    >
                                        {/* Cinematic Box Container */}
                                        <div
                                            className="relative w-full h-full"
                                            style={{
                                                transform: shouldReduceMotion 
                                                    ? 'none' 
                                                    : `translate3d(0, 0, ${transform.translateZ}px) rotateY(${transform.rotateY}deg) rotateX(${transform.rotateX}deg)`,
                                                transformStyle: 'preserve-3d',
                                                willChange: 'transform',
                                                backfaceVisibility: 'hidden',
                                                WebkitBackfaceVisibility: 'hidden'
                                            }}
                                        >
                                            {/* Main Cinematic Frame */}
                                            <div
                                                className={`
                                                    ${heightClass}
                                                    bg-gradient-to-br from-white/5 via-white/3 to-white/5
                                                    border border-white/10
                                                    p-4 sm:p-5 md:p-6 lg:p-8
                                                    rounded-lg sm:rounded-xl
                                                    backdrop-blur-sm 
                                                    cursor-default
                                                    relative overflow-hidden
                                                    flex flex-col
                                                    box-border
                                                    shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_100px_rgba(255,255,255,0.02)]
                                                    transition-all duration-500
                                                    group-hover:border-white/30
                                                    group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:via-white/5 group-hover:to-white/10
                                                    group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2),inset_0_0_100px_rgba(255,255,255,0.05)]
                                                `}
                                                style={{
                                                    transform: shouldReduceMotion ? 'none' : 'translate3d(0, 0, 20px)',
                                                    minHeight: isCenter ? '300px' : '250px',
                                                    willChange: 'transform',
                                                    backfaceVisibility: 'hidden',
                                                    WebkitBackfaceVisibility: 'hidden'
                                                }}
                                            >
                                                {/* Cinematic letterbox bars (top and bottom) */}
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />

                                                {/* Anamorphic lens flare effect */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl" />
                                                </div>

                                                {/* Shiny overlay effect */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{
                                                        animation: 'shimmer 4s infinite',
                                                        backgroundSize: '200% 100%'
                                                    }} />
                                                </div>
                                                
                                                {/* Depth of field blur effect */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                                                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/5" />
                                                </div>
                                                
                                                <div className="relative flex flex-col h-full z-10">
                                                    {/* Icon and Company Header */}
                                                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 shrink-0">
                                                            <HiBriefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                                        </div>
                                                        {exp.location && (
                                                            <div className="flex items-center gap-1 text-xs text-white/60">
                                                                <HiLocationMarker className="w-3 h-3" />
                                                                <span className="hidden sm:inline">{exp.location}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Position Title - Cinematic Typography */}
                                                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-wide">
                                                        <span className="bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                                                            {exp.position}
                                                        </span>
                                                    </h3>

                                                    {/* Company Name */}
                                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-semibold mb-3 sm:mb-4 tracking-wide">
                                                        {exp.company}
                                                    </p>

                                                    {/* Period */}
                                                    <div className="flex items-center gap-1.5 mb-4 sm:mb-5 text-xs sm:text-sm text-white/60">
                                                        <HiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        <span className="tracking-wide">{exp.period}</span>
                                                    </div>

                                                    {/* Description */}
                                                    {exp.description && (
                                                        <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-grow tracking-wide">
                                                            {exp.description}
                                                        </p>
                                                    )}

                                                    {/* Technologies Tags */}
                                                    {exp.technologies && exp.technologies.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/10">
                                                            {exp.technologies.slice(0, isCenter ? 6 : 4).map((tech, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="text-[9px] sm:text-[10px] md:text-xs bg-white/10 text-white px-2 py-0.5 rounded-full border border-white/10"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                            {exp.technologies.length > (isCenter ? 6 : 4) && (
                                                                <span className="text-[9px] sm:text-[10px] md:text-xs text-white/60 px-2 py-0.5">
                                                                    +{exp.technologies.length - (isCenter ? 6 : 4)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Responsibilities Preview */}
                                                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                                                        <div className="mt-3 pt-3 border-t border-white/10">
                                                            <ul className="space-y-1.5">
                                                                {exp.responsibilities.slice(0, isCenter ? 4 : 2).map((responsibility, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                                                                        <span className="text-white/40 mt-0.5 shrink-0">▸</span>
                                                                        <span className="line-clamp-2">{responsibility}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 3D Depth Faces - Top */}
                                            <div
                                                className="absolute bg-gradient-to-b from-white/10 to-white/2 border-white/10 border-t rounded-t-lg sm:rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                style={{
                                                    transform: 'rotateX(-90deg) translateZ(20px)',
                                                    transformOrigin: 'top',
                                                    height: '20px',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0
                                                }}
                                            />

                                            {/* 3D Depth Faces - Right */}
                                            <div
                                                className="absolute bg-gradient-to-l from-white/10 to-white/2 border-white/10 border-r rounded-r-lg sm:rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                                style={{
                                                    transform: 'rotateY(90deg) translateZ(20px)',
                                                    transformOrigin: 'right',
                                                    width: '20px',
                                                    top: 0,
                                                    bottom: 0,
                                                    right: 0
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
