import React from 'react';
import { HiChip, HiSparkles } from 'react-icons/hi';
import { config } from '../config.jsx';

const getLevelPercentage = (level) => {
    switch (level) {
        case 'Expert': return 95;
        case 'Advanced': return 85;
        case 'Intermediate': return 70;
        case 'Beginner': return 50;
        default: return 75;
    }
};

const getLevelColor = (level) => {
    switch (level) {
        case 'Expert': return 'bg-emerald-500';
        case 'Advanced': return 'bg-indigo-500';
        case 'Intermediate': return 'bg-blue-500';
        default: return 'bg-gray-400';
    }
};

const SkillCard = ({ skill }) => {
    const pct = getLevelPercentage(skill.level);
    const colorClass = getLevelColor(skill.level);

    return (
        <div className="bg-white border border-gray-200 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900">{skill.name}</h4>
                {skill.hot && (
                    <div className="bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded-full flex items-center gap-0.5 font-bold uppercase">
                        <HiSparkles className="w-2.5 h-2.5" />
                        Hot
                    </div>
                )}
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>

            <div className="flex justify-between items-center">
                <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-medium">Proficiency</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-600">{skill.level}</span>
            </div>
        </div>
    );
};

const Skills = () => {
    const skills = config.skills;

    return (
        <section id="skills" className="py-12 md:py-20 bg-white">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="flex flex-col items-center mb-10 md:mb-14">
                    <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full mb-4">
                        <div className="flex items-center space-x-2">
                            <HiChip className="w-4 h-4" />
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest">Skills</span>
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center display-font mb-2">
                        Tech Stack
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 max-w-md text-center">
                        Technologies I use to turn ideas into reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {skills.map((category, catIdx) => (
                        <div key={catIdx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-lg bg-white border border-gray-200 shadow-sm text-indigo-600">
                                    <div className="w-5 h-5">{category.icon}</div>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 display-font">{category.title}</h3>
                                    <p className="text-[10px] sm:text-xs text-gray-500">{category.description}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-full">
                                        <SkillCard skill={skill} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
