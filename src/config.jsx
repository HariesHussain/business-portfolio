import { FaPhone, FaLinkedinIn } from "react-icons/fa";
import React from 'react';
import { FaGithub, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase, HiAcademicCap } from "react-icons/hi";

export const config = {
    developer: {
        name: "Haries",
        title: "AIML Student & Web Developer",
        resumeUrl: "/resume/Haries_Resume.pdf",
    },
    social: {
        github: "HariesHussain",
        linkedin: "haries-hussain-shaik-06574632a",
    },
    education: {
        degree: "B.Tech in Artificial Intelligence & Machine Learning",
        university: "Santhiram Engineering College",
        period: "2024 - 2028",
    },
    aboutMe: "I'm an AIML undergraduate passionate about building intelligent systems and modern web applications. I combine my knowledge of AI, data science, and full-stack development to create impactful digital solutions. Currently seeking internship opportunities in AI/ML and software development.",
    NAV_ITEMS: [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/certificates', label: 'Certificates' },
        { href: '/contact', label: 'Contact' },
    ],
    skills: [
        {
            title: "AI & Machine Learning",
            icon: <HiDatabase />,
            description: "Models & Data Science",
            bgClass: "bg-purple-500/10",
            iconClass: "text-purple-500",
            skills: [
                { name: "Python", level: "Advanced", hot: true },
                { name: "TensorFlow", level: "Intermediate" },
                { name: "Scikit-Learn", level: "Intermediate" },
                { name: "Pandas/NumPy", level: "Advanced" }
            ]
        },
        {
            title: "Frontend Development",
            icon: <HiCode />,
            description: "Modern web interfaces",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "React / Vite", level: "Advanced", hot: true },
                { name: "TailwindCSS", level: "Advanced" },
                { name: "JavaScript", level: "Advanced" },
                { name: "HTML / CSS", level: "Expert" }
            ]
        },
        {
            title: "Tools & Platforms",
            icon: <HiCube />,
            description: "Development workflows",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "Git & GitHub", level: "Advanced", hot: true },
                { name: "VS Code", level: "Expert" },
                { name: "Vercel / GitHub Pages", level: "Advanced" },
                { name: "Chrome DevTools", level: "Advanced" }
            ]
        }
    ],
    featuredProjects: [
        {
            name: "student-portfolio",
            description: "Modern Portfolio Website | React + Vite + Tailwind CSS",
            html_url: "https://github.com/HariesHussain/student-portfolio",
            language: "JavaScript",
            stargazers_count: 1,
            forks_count: 0,
            topics: ["react", "portfolio", "vite", "tailwind"]
        },
        {
            name: "habit-tracker",
            description: "Track daily habits with beautiful UI | React + TailwindCSS + Local Storage",
            html_url: "https://github.com/HariesHussain/habit-tracker",
            language: "JavaScript",
            stargazers_count: 0,
            forks_count: 0,
            topics: ["react", "habit-tracker", "productivity", "tailwind"]
        },
        {
            name: "FitGenie",
            description: "FitGenie is a React + Vite AI fitness coach app with Firebase auth, workout/nutrition tracking, and a secure purchase system.",
            html_url: "https://github.com/HariesHussain/FitGenie",
            language: "TypeScript",
            stargazers_count: 0,
            forks_count: 0,
            topics: ["react", "fitness", "ai", "firebase"]
        }
    ],
    experiences: [
        {
            position: "Web Developer",
            company: "Independent Projects",
            period: "2025 - Present",
            location: "Nandyal, AP",
            description: "Building responsive, SEO-optimized websites using React, Vite, and TailwindCSS. Focused on clean UI/UX, fast loading times, and mobile-first design.",
            technologies: ["React", "Vite", "TailwindCSS", "JavaScript", "GitHub Pages", "Vercel"]
        },
        {
            position: "AIML Student Developer",
            company: "Santhiram Engineering College",
            period: "2026 - Present",
            location: "Nandyal, AP",
            description: "Studying AI & Machine Learning fundamentals including supervised learning, neural networks, and data analysis. Building academic projects using Python and web technologies.",
            technologies: ["Python", "TensorFlow", "Pandas", "HTML", "CSS", "JavaScript"]
        }
    ],
    certificates: [
        {
            title: "Web Development",
            issuer: "Eduskills",
            year: "2025",
            file: "/certificates/web-development.pdf"
        },
        {
            title: "Prompt Engineering",
            issuer: "Simplilearn",
            year: "2025",
            file: "/certificates/prompt-engineering.pdf"
        },
        {
            title: "Machine Learning Using Python",
            issuer: "Simplilearn",
            year: "2025",
            file: "/certificates/ml-python.pdf"
        },
        {
            title: "Generative AI",
            issuer: "Simplilearn",
            year: "2025",
            file: "/certificates/generative-ai.pdf"
        },
        {
            title: "AI-ML Virtual Internship",
            issuer: "Virtual Internship",
            year: "2026",
            file: "/certificates/AI-ML Virtual Internship.pdf"
        },
        {
            title: "Zero Trust Cloud Security",
            issuer: "Virtual Internship",
            year: "2026",
            file: "/certificates/Zero Trust Cloud Security Virtual Internship (1).pdf"
        }
    ],
    contactInfo: [
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "shaikharieshussain09@gmail.com",
            link: "https://mail.google.com/mail/?view=cm&fs=1&to=shaikharieshussain09@gmail.com"
        },
        {
            icon: <FaLinkedinIn className="w-5 h-5" />,
            label: "LinkedIn",
            value: "Haries Hussain",
            link: "https://www.linkedin.com/in/haries-hussain-shaik-06574632a"
        },
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@HariesHussain",
            link: "https://github.com/HariesHussain"
        },
        {
            icon: <FaPhone className="w-5 h-5" />,
            label: "Phone",
            value: "+91 9391175096",
            link: "tel:+919391175096"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "Nandyal, Andhra Pradesh, India",
            link: null
        }
    ]
} 