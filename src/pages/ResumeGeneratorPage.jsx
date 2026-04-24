import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiDocumentDownload, HiCheckCircle, HiRefresh, HiSparkles } from 'react-icons/hi';
import SEO from '../components/SEO';
import { config } from '../config';

const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

const ATS_MODES = {
    FRONTEND: {
        title: 'Frontend Developer',
        summary: 'Detail-oriented Frontend Developer with expertise in building responsive, accessible, and highly performant user interfaces using React, JavaScript, and modern CSS frameworks. Passionate about delivering seamless user experiences, optimizing web performance, and writing clean, maintainable code.',
        targetKeywords: 'React, JavaScript, Tailwind CSS, Frontend Development, Responsive Design, Web Performance, UI/UX, DOM Manipulation, Git',
        skills: {
            Languages: 'JavaScript (ES6+), HTML5, CSS3, TypeScript',
            Frameworks: 'React, Vite, Tailwind CSS, Bootstrap, Redux',
            Tools: 'VS Code, Git, GitHub, Chrome DevTools, Figma',
            Concepts: 'Responsive Design, UI/UX, Web Accessibility, SPA, DOM Manipulation'
        }
    },
    FULLSTACK: {
        title: 'Full Stack Developer',
        summary: 'Versatile Full Stack Developer experienced in architecting scalable web applications across the MERN stack. Proficient in developing robust RESTful APIs, integrating databases, and building dynamic front-end interfaces to deliver end-to-end solutions.',
        targetKeywords: 'React, Node.js, Express, MongoDB, Full Stack, API Design, RESTful APIs, Backend Architecture, Database Management',
        skills: {
            Languages: 'JavaScript, TypeScript, HTML, CSS, SQL',
            Frameworks: 'React, Node.js, Express.js, Tailwind CSS, Next.js',
            Tools: 'Git, Docker, Postman, MongoDB Compass, VS Code',
            Concepts: 'RESTful APIs, Database Design, Authentication (JWT), Microservices'
        }
    },
    SOFTWARE_ENGINEER: {
        title: 'Software Engineer',
        summary: 'Driven Software Engineer with a strong foundation in algorithmic problem solving and software design principles. Experienced in developing scalable applications, optimizing codebase performance, and collaborating in agile environments to build robust software systems.',
        targetKeywords: 'Software Engineering, Algorithms, Data Structures, Object-Oriented Programming, System Design, Git, Agile, Problem Solving',
        skills: {
            Languages: 'Java, Python, C++, JavaScript, SQL',
            Frameworks: 'Spring Boot, Node.js, React',
            Tools: 'Git, Linux, Docker, AWS, Jenkins',
            Concepts: 'Data Structures, Algorithms, OOP, Agile, System Design'
        }
    },
    AIML_INTERN: {
        title: 'AI / ML Intern',
        summary: 'Motivated AI/ML Enthusiast with hands-on experience in machine learning algorithms, deep learning, and data preprocessing using Python, TensorFlow, and Scikit-Learn. Eager to leverage analytical skills to build predictive models and integrate AI solutions.',
        targetKeywords: 'Python, Machine Learning, Deep Learning, TensorFlow, Scikit-Learn, Data Analysis, Neural Networks, Pandas, NLP',
        skills: {
            Languages: 'Python, R, SQL, C++',
            Frameworks: 'TensorFlow, PyTorch, Scikit-Learn, Pandas, NumPy',
            Tools: 'Jupyter Notebook, Google Colab, Git, Docker',
            Concepts: 'Machine Learning, Deep Learning, NLP, Data Preprocessing, Neural Networks'
        }
    },
    WEB_DEV_INTERN: {
        title: 'Web Developer Intern',
        summary: 'Aspiring Web Developer with a strong foundation in modern web technologies including HTML5, CSS3, JavaScript, and React. Passionate about learning new tools, contributing to team projects, and creating engaging, user-friendly digital experiences.',
        targetKeywords: 'HTML, CSS, JavaScript, React, Web Development, Problem Solving, Git, GitHub, Responsive UI',
        skills: {
            Languages: 'JavaScript, HTML5, CSS3, Python',
            Frameworks: 'React, Tailwind CSS, Vite',
            Tools: 'Git, GitHub, VS Code, Figma',
            Concepts: 'Responsive Web Design, Frontend Basics, Problem Solving, Team Collaboration'
        }
    }
};

const ResumeGeneratorPage = () => {
    const [mode, setMode] = useState('FRONTEND');
    const [targetJobDescription, setTargetJobDescription] = useState(ATS_MODES.FRONTEND.targetKeywords);
    const [githubProjects, setGithubProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [atsScore, setAtsScore] = useState(0);
    const [matchedKeywords, setMatchedKeywords] = useState([]);
    const [missingKeywords, setMissingKeywords] = useState([]);
    
    // Resume Data State
    const [resumeData, setResumeData] = useState({
        name: config.developer.name,
        email: config.contactInfo.find(c => c.label === 'Email')?.value || '',
        phone: config.contactInfo.find(c => c.label === 'Phone')?.value || '',
        linkedin: `linkedin.com/in/${config.social.linkedin}`,
        github: `github.com/${config.social.github}`,
        portfolio: 'harieshussain.me',
        location: config.contactInfo.find(c => c.label === 'Location')?.value || 'Nandyal, AP, India',
        summary: ATS_MODES.FRONTEND.summary,
        education: config.education,
        skills: ATS_MODES.FRONTEND.skills,
        certifications: config.certificates?.map(c => c.title) || [],
    });

    useEffect(() => {
        // Fetch Github Projects
        fetch(`${GITHUB_API_URL}?sort=updated&per_page=10`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const validProjects = data.filter(p => !p.fork && !p.private).slice(0, 4);
                    setGithubProjects(validProjects);
                    setSelectedProjects(validProjects.map((p, index) => {
                        const nameLower = p.name.toLowerCase();
                        const descLower = (p.description || '').toLowerCase();
                        const techStack = p.language || 'JavaScript';
                        const liveLink = p.homepage || '';
                        
                        const isReact = nameLower.includes('react') || descLower.includes('react');
                        const isNode = nameLower.includes('node') || descLower.includes('node') || descLower.includes('express');
                        const isTailwind = nameLower.includes('tailwind') || descLower.includes('tailwind');
                        const isAI = nameLower.includes('ai') || descLower.includes('ai') || descLower.includes('machine learning') || nameLower.includes('ml');
                        const isSEO = nameLower.includes('seo') || descLower.includes('seo');
                        
                        let bullets = [];
                        
                        const actionVerbs = [
                            ['Architected', 'Engineered', 'Developed', 'Built'],
                            ['Implemented', 'Integrated', 'Designed', 'Crafted'],
                            ['Optimized', 'Enhanced', 'Streamlined', 'Elevated']
                        ];
                        
                        const v1 = actionVerbs[0][index % 4];
                        const v2 = actionVerbs[1][index % 4];
                        const v3 = actionVerbs[2][index % 4];

                        if (isReact) {
                            bullets.push(`${v1} a responsive, component-driven user interface using React, establishing a reusable UI architecture.`);
                        } else {
                            bullets.push(`${v1} scalable application features using ${techStack}, adhering to clean code and modern development standards.`);
                        }
                        
                        if (isNode) {
                            bullets.push(`${v2} secure RESTful APIs and robust backend logic with Node.js/Express, ensuring efficient data processing.`);
                        } else if (isTailwind) {
                            bullets.push(`${v2} modern, mobile-first layouts using Tailwind CSS, achieving 100% responsiveness across devices.`);
                        } else if (isAI) {
                            bullets.push(`${v2} AI/ML integrations to automate complex tasks, significantly enhancing data analysis and predictions.`);
                        } else {
                            bullets.push(p.description ? `${v2} key functionality for: ${p.description.substring(0, 65)}...` : `${v2} critical technical requirements to deliver a high-quality software solution.`);
                        }

                        if (liveLink) {
                            bullets.push(`${v3} application deployment pipeline, improving continuous delivery and optimizing live performance.`);
                        } else if (isSEO) {
                            bullets.push(`${v3} search visibility through advanced SEO best practices, semantic HTML, and metadata tuning.`);
                        } else {
                            bullets.push(`${v3} codebase maintainability and overall performance by utilizing efficient data structures and algorithms.`);
                        }

                        return {
                            id: p.id,
                            name: p.name,
                            techStack: techStack,
                            liveLink: liveLink,
                            githubLink: p.html_url,
                            bullets: bullets
                        };
                    }));
                }
            })
            .catch(err => console.error(err));
    }, []);

    // Change Mode Handler
    const handleModeChange = (newMode) => {
        setMode(newMode);
        setResumeData(prev => ({
            ...prev,
            summary: ATS_MODES[newMode].summary,
            skills: ATS_MODES[newMode].skills
        }));
        setTargetJobDescription(ATS_MODES[newMode].targetKeywords);
    };

    // Calculate ATS Score based on JD matching
    useEffect(() => {
        if (!targetJobDescription) {
            setAtsScore(0);
            setMatchedKeywords([]);
            setMissingKeywords([]);
            return;
        }

        // Extremely simple keyword extraction (just split by commas or spaces for demo)
        const keywords = targetJobDescription
            .split(/[\s,]+/)
            .map(k => k.trim().toLowerCase())
            .filter(k => k.length > 2 && !['and', 'the', 'with', 'for', 'experience', 'skills'].includes(k));
        
        const uniqueKeywords = [...new Set(keywords)];
        
        const resumeText = JSON.stringify(resumeData).toLowerCase() + JSON.stringify(selectedProjects).toLowerCase();
        
        const matched = [];
        const missing = [];

        uniqueKeywords.forEach(kw => {
            if (resumeText.includes(kw)) {
                matched.push(kw);
            } else {
                missing.push(kw);
            }
        });

        const score = uniqueKeywords.length > 0 
            ? Math.round((matched.length / uniqueKeywords.length) * 100) 
            : 0;

        // Boost score slightly for basic structure completion
        const finalScore = Math.min(100, score + 20);

        setAtsScore(finalScore);
        setMatchedKeywords(matched);
        setMissingKeywords(missing);

    }, [resumeData, selectedProjects, targetJobDescription]);

    const handlePrint = () => {
        window.print();
    };

    const handleBulletChange = (projectId, bulletIndex, value) => {
        setSelectedProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                const newBullets = [...p.bullets];
                newBullets[bulletIndex] = value;
                return { ...p, bullets: newBullets };
            }
            return p;
        }));
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-8 md:pt-32 md:pb-16">
            <SEO 
                title="ATS Resume Generator | Haries Hussain — Web Developer Mulanpeta"
                description="Generate a god-level ATS-friendly resume optimized for software engineering and AI/ML roles. Free tool by Haries Hussain, Mulanpeta, Nandyal."
                keywords="ATS Resume generator Nandyal, Free ATS resume Mulanpeta, Haries Hussain resume tool, AIML resume builder AP"
                schemaType="WebApplication"
            />
            
            <div className="container mx-auto px-4 max-w-7xl no-print">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 display-font flex items-center gap-2">
                            <HiSparkles className="text-indigo-600" /> Auto ATS Resume Builder
                        </h1>
                        <p className="text-gray-600 mt-2">Optimize your resume to beat the Applicant Tracking System.</p>
                    </div>
                    <button 
                        onClick={handlePrint}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm"
                    >
                        <HiDocumentDownload className="w-5 h-5" />
                        Export PDF
                    </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Controls Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* ATS Score Panel */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <HiCheckCircle className="text-emerald-500 w-5 h-5" /> ATS Score Meter
                            </h2>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-gray-100"
                                            strokeWidth="3"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className={`${atsScore >= 80 ? 'text-emerald-500' : atsScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}
                                            strokeDasharray={`${atsScore}, 100`}
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-gray-900">
                                        {atsScore}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {atsScore >= 80 ? 'Excellent Match!' : atsScore >= 60 ? 'Good, but needs work.' : 'Low Match'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Based on Job Description keywords.</p>
                                </div>
                            </div>
                            
                            {missingKeywords.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Missing Keywords</p>
                                    <div className="flex flex-wrap gap-1">
                                        {missingKeywords.slice(0, 10).map((kw, i) => (
                                            <span key={i} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-medium border border-red-100">{kw}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Configuration Form */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                            <h2 className="font-bold text-gray-900 mb-4">Resume Configuration</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Mode</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(ATS_MODES).map(([key, value]) => (
                                            <button
                                                key={key}
                                                onClick={() => handleModeChange(key)}
                                                className={`text-xs py-2 px-3 rounded-lg border font-medium transition ${
                                                    mode === key 
                                                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                {value.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Job Description / Keywords</label>
                                    <textarea 
                                        className="w-full text-sm border border-gray-200 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                        rows="3"
                                        placeholder="Paste job description or keywords here..."
                                        value={targetJobDescription}
                                        onChange={(e) => setTargetJobDescription(e.target.value)}
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">We will scan these to calculate your ATS score.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Smart Bullet Editor</label>
                                    <p className="text-xs text-gray-600 mb-3">Edit your project bullets to include numbers and action verbs.</p>
                                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                        {selectedProjects.map(proj => (
                                            <div key={proj.id} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
                                                <h4 className="text-sm font-bold text-gray-900 mb-2">{proj.name}</h4>
                                                <div className="space-y-2">
                                                    {proj.bullets.map((b, i) => (
                                                        <input 
                                                            key={i}
                                                            type="text"
                                                            value={b}
                                                            onChange={(e) => handleBulletChange(proj.id, i, e.target.value)}
                                                            className="w-full text-[11px] p-1.5 border border-gray-200 rounded"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Resume Preview */}
                    <div className="lg:col-span-8 overflow-x-auto bg-gray-200 p-4 sm:p-8 rounded-xl">
                        {/* THE ATS RESUME PAPER */}
                        <div className="bg-white mx-auto shadow-2xl print:shadow-none print:m-0 w-full max-w-[800px] min-h-[1056px] p-[0.5in] ats-resume text-black relative">
                            
                            {/* 1. Header */}
                            <div className="text-center border-b-2 border-black pb-3 mb-3">
                                <h1 className="text-2xl font-bold uppercase tracking-wider mb-1 text-black">{resumeData.name}</h1>
                                <div className="text-[11px] flex flex-wrap justify-center gap-2 text-black">
                                    <span>{resumeData.location}</span>
                                    <span>|</span>
                                    <span>{resumeData.phone}</span>
                                    <span>|</span>
                                    <span>{resumeData.email}</span>
                                    <span>|</span>
                                    <a href={`https://${resumeData.linkedin}`} className="text-blue-600 underline">{resumeData.linkedin}</a>
                                    <span>|</span>
                                    <a href={`https://${resumeData.github}`} className="text-blue-600 underline">{resumeData.github}</a>
                                    <span>|</span>
                                    <a href={`https://${resumeData.portfolio}`} className="text-blue-600 underline">{resumeData.portfolio}</a>
                                </div>
                            </div>

                            {/* 2. Professional Summary */}
                            <div className="mb-3">
                                <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Professional Summary</h2>
                                <p className="text-[11px] leading-snug text-black">
                                    {resumeData.summary}
                                </p>
                            </div>

                            {/* 3. Skills */}
                            <div className="mb-3">
                                <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Technical Skills</h2>
                                <div className="text-[11px] leading-snug text-black space-y-0.5">
                                    <p><strong>Languages:</strong> {resumeData.skills.Languages}</p>
                                    <p><strong>Frameworks/Libraries:</strong> {resumeData.skills.Frameworks}</p>
                                    <p><strong>Tools:</strong> {resumeData.skills.Tools}</p>
                                    <p><strong>Concepts:</strong> {resumeData.skills.Concepts}</p>
                                </div>
                            </div>

                            {/* 4. Projects */}
                            <div className="mb-3">
                                <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Projects</h2>
                                <div className="space-y-2">
                                    {selectedProjects.map(proj => (
                                        <div key={proj.id}>
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <div className="text-[11px] text-black">
                                                    <strong>{proj.name}</strong> | <em>{proj.techStack}</em>
                                                </div>
                                                <div className="text-[10px] text-black">
                                                    <a href={proj.githubLink} className="text-blue-600 underline mr-2">GitHub</a>
                                                    {proj.liveLink && <a href={proj.liveLink} className="text-blue-600 underline">Live</a>}
                                                </div>
                                            </div>
                                            <ul className="list-disc list-outside ml-4 text-[10px] leading-snug text-black space-y-0.5">
                                                {proj.bullets.map((b, i) => (
                                                    <li key={i}>{b}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Education */}
                            <div className="mb-3">
                                <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Education</h2>
                                <div className="flex justify-between items-baseline text-black">
                                    <div className="text-[11px]">
                                        <strong>{resumeData.education.degree}</strong>, {resumeData.education.university}
                                    </div>
                                    <div className="text-[11px] font-medium">{resumeData.education.period}</div>
                                </div>
                                <div className="text-[10px] mt-0.5 text-black">CGPA: {resumeData.education.gpa}</div>
                            </div>

                            {/* 6. Certifications */}
                            {resumeData.certifications.length > 0 && (
                                <div>
                                    <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Certifications & Achievements</h2>
                                    <ul className="list-disc list-outside ml-4 text-[11px] leading-snug text-black space-y-0.5">
                                        {resumeData.certifications.map((cert, i) => (
                                            <li key={i}>{cert}</li>
                                        ))}
                                        <li>Built and deployed multiple live web projects with SEO optimization</li>
                                        <li>Active Open Source contributor on GitHub</li>
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Print Only Version */}
            <div className="hidden print-only print:block ats-resume text-black max-w-[8.5in] mx-auto">
                {/* Print layout is identical to preview but hides UI via CSS */}
                {/* 1. Header */}
                <div className="text-center border-b-2 border-black pb-3 mb-3">
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-1 text-black">{resumeData.name}</h1>
                    <div className="text-[11px] flex flex-wrap justify-center gap-2 text-black">
                        <span>{resumeData.location}</span>
                        <span>|</span>
                        <span>{resumeData.phone}</span>
                        <span>|</span>
                        <span>{resumeData.email}</span>
                        <span>|</span>
                        <a href={`https://${resumeData.linkedin}`} className="text-blue-600 underline">{resumeData.linkedin}</a>
                        <span>|</span>
                        <a href={`https://${resumeData.github}`} className="text-blue-600 underline">{resumeData.github}</a>
                        <span>|</span>
                        <a href={`https://${resumeData.portfolio}`} className="text-blue-600 underline">{resumeData.portfolio}</a>
                    </div>
                </div>

                {/* 2. Professional Summary */}
                <div className="mb-3">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Professional Summary</h2>
                    <p className="text-[11px] leading-snug text-black">
                        {resumeData.summary}
                    </p>
                </div>

                {/* 3. Skills */}
                <div className="mb-3">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Technical Skills</h2>
                    <div className="text-[11px] leading-snug text-black space-y-0.5">
                        <p><strong>Languages:</strong> {resumeData.skills.Languages}</p>
                        <p><strong>Frameworks/Libraries:</strong> {resumeData.skills.Frameworks}</p>
                        <p><strong>Tools:</strong> {resumeData.skills.Tools}</p>
                        <p><strong>Concepts:</strong> {resumeData.skills.Concepts}</p>
                    </div>
                </div>

                {/* 4. Projects */}
                <div className="mb-3">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Projects</h2>
                    <div className="space-y-2">
                        {selectedProjects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <div className="text-[11px] text-black">
                                        <strong>{proj.name}</strong> | <em>{proj.techStack}</em>
                                    </div>
                                    <div className="text-[10px] text-black">
                                        <a href={proj.githubLink} className="text-blue-600 underline mr-2">GitHub</a>
                                        {proj.liveLink && <a href={proj.liveLink} className="text-blue-600 underline">Live</a>}
                                    </div>
                                </div>
                                <ul className="list-disc list-outside ml-4 text-[10px] leading-snug text-black space-y-0.5">
                                    {proj.bullets.map((b, i) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Education */}
                <div className="mb-3">
                    <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Education</h2>
                    <div className="flex justify-between items-baseline text-black">
                        <div className="text-[11px]">
                            <strong>{resumeData.education.degree}</strong>, {resumeData.education.university}
                        </div>
                        <div className="text-[11px] font-medium">{resumeData.education.period}</div>
                    </div>
                    <div className="text-[10px] mt-0.5 text-black">CGPA: {resumeData.education.gpa}</div>
                </div>

                {/* 6. Certifications */}
                {resumeData.certifications.length > 0 && (
                    <div>
                        <h2 className="text-[12px] font-bold uppercase tracking-wider border-b border-gray-300 pb-0.5 mb-1.5 text-black">Certifications & Achievements</h2>
                        <ul className="list-disc list-outside ml-4 text-[11px] leading-snug text-black space-y-0.5">
                            {resumeData.certifications.map((cert, i) => (
                                <li key={i}>{cert}</li>
                            ))}
                            <li>Built and deployed multiple live web projects with SEO optimization</li>
                            <li>Active Open Source contributor on GitHub</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeGeneratorPage;
