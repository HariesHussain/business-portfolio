import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { HiExternalLink, HiArrowRight } from 'react-icons/hi';
import useSWR from 'swr';
import { config } from '../config.jsx';

const languageColors = {
    JavaScript: '#f1e05a', TypeScript: '#2b7489', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
};

const ITEMS_PER_PAGE = 3;
const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
};

const ProjectCard = ({ project }) => {
    const topics = project.topics || [];
    return (
        <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="group block">
            <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-xl h-full flex flex-col hover:shadow-md hover:border-indigo-200 transition-all">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <FaGithub className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                        <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-indigo-600 transition-colors">{project.name}</h3>
                    </div>
                    <HiExternalLink className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed flex-1 mb-3">
                    {project.description || "No description provided"}
                </p>
                {topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {topics.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                    </div>
                )}
                <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
                    {project.language && (
                        <div className="flex items-center space-x-1">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColors[project.language] || '#888' }} />
                            <span className="text-[10px] sm:text-xs font-medium text-gray-500">{project.language}</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-1">
                        <FaStar className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaCodeBranch className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">{project.forks_count}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

const Projects = () => {
    // Use featured projects from config instead of fetching all repos
    const projects = config.featuredProjects || [];

    return (
        <section id="projects" className="py-12 md:py-20 bg-gray-50">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="flex flex-col items-center mb-10 md:mb-14">
                    <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
                        <div className="flex items-center space-x-2">
                            <FaGithub className="w-4 h-4" />
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest">Projects</span>
                        </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center display-font mb-2">
                        Open Source Work
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 max-w-md text-center">
                        My latest projects and contributions on GitHub
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
                </div>

                <div className="flex justify-center mt-8">
                    <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors">
                        View All Projects <HiArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Projects;
