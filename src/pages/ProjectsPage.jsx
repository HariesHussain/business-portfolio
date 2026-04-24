import React, { useState, useMemo } from 'react';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';
import useSWR from 'swr';
import { config } from '../config.jsx';
import SEO from '../components/SEO';

const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
};

const ITEMS_PER_PAGE = 12;
const GITHUB_API_URL = `https://api.github.com/users/${config.social.github}/repos`;

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch GitHub projects');
    return res.json();
};

const ProjectCard = ({ project }) => {
    const topics = project.topics || [];

    return (
        <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
        >
            <div className="bg-white border border-gray-200 p-6 rounded-2xl h-full flex flex-col hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                        <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" />
                        <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-indigo-600 transition-colors">
                            {project.name}
                        </h3>
                    </div>
                    <HiExternalLink className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1 mb-4">
                    {project.description || "No description provided"}
                </p>

                {topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {topics.slice(0, 3).map((topic) => (
                            <span key={topic} className="text-[11px] font-medium bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full">
                                {topic}
                            </span>
                        ))}
                        {topics.length > 3 && (
                            <span className="text-[11px] text-gray-400 font-medium self-center">+{topics.length - 3}</span>
                        )}
                    </div>
                )}

                <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
                    {project.language && (
                        <div className="flex items-center space-x-1.5">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: languageColors[project.language] || '#888' }} />
                            <span className="text-xs font-medium text-gray-500">{project.language}</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-1">
                        <FaStar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500">{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaCodeBranch className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500">{project.forks_count}</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

const ProjectsPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading } = useSWR(
        `${GITHUB_API_URL}?sort=updated&per_page=${ITEMS_PER_PAGE * page}`,
        fetcher,
        { revalidateOnFocus: false, refreshInterval: 300000, shouldRetryOnError: false }
    );

    const projects = useMemo(() => {
        if (!data) return [];
        return data
            .filter(p => !p.fork && !p.private)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, ITEMS_PER_PAGE * page);
    }, [data, page]);

    return (
        <>
        <SEO
            title="Projects | Haries Hussain — Web Developer Nandyal"
            description="Explore web development projects by Haries Hussain, an AIML student & frontend developer in Nandyal. Open source React, JS, and Python applications."
            keywords="Local web development projects Nandyal Mulanpeta, Mulanpeta street developer, Web projects Nandyal, Haries Hussain projects"
            path="/projects"
            schemaType="CollectionPage"
        />
        <section className="pt-28 pb-12 md:pt-40 md:pb-24 bg-gray-50">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="space-y-12">
                    {/* Header */}
                    <div className="mb-12 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-4 max-w-2xl">
                                <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full mb-4">
                                    <FaGithub className="w-4 h-4" />
                                    <span className="text-sm font-semibold">GitHub Projects</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight display-font">
                                    Open Source Projects
                                </h1>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                    A collection of my public repositories, showcasing projects in{' '}
                                    <span className="text-gray-900 font-semibold">full-stack development</span>,{' '}
                                    <span className="text-gray-900 font-semibold">web technologies</span>, and{' '}
                                    <span className="text-gray-900 font-semibold">open source contributions</span>.
                                </p>
                            </div>

                            <a
                                href={`https://github.com/${config.social.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors w-full md:w-auto justify-center"
                            >
                                View GitHub
                                <HiArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 pt-2">
                            <div>
                                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{projects.length}+</span>
                                <p className="text-sm text-gray-500">Public Repos</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div>
                                <span className="text-2xl sm:text-3xl font-bold text-indigo-600">—</span>
                                <p className="text-sm text-gray-500">Actively Learning</p>
                            </div>
                        </div>

                        <div className="h-px w-full bg-gray-200" />
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {isLoading ? (
                            Array(ITEMS_PER_PAGE).fill(0).map((_, i) => (
                                <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl min-h-[200px] animate-pulse" />
                            ))
                        ) : error ? (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                Failed to load projects. Please try again later.
                            </div>
                        ) : (
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        )}
                    </div>

                    {/* Load More */}
                    {!error && data?.length > projects.length && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="px-8 py-3.5 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                            >
                                Load More Projects
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
        </>
    );
};

export default ProjectsPage;
