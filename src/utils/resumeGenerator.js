import jsPDF from 'jspdf';
import { config } from '../config.jsx';

const GITHUB_API = `https://api.github.com/users/${config.social.github}/repos`;

/**
 * Fetches real GitHub projects and generates an ATS-friendly PDF resume.
 * Incorporates recruiter feedback for maximum shortlist potential.
 */
export async function generateResumePDF() {
    // 1. Fetch real GitHub projects
    let projects = [];
    try {
        const res = await fetch(`${GITHUB_API}?sort=updated&per_page=30`);
        const data = await res.json();
        if (Array.isArray(data)) {
            projects = data
                .filter(p => !p.fork && !p.private)
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 5)
                .map(p => ({
                    name: formatProjectName(p.name),
                    description: p.description || '',
                    language: p.language || 'JavaScript',
                    topics: p.topics || [],
                    url: p.html_url,
                    homepage: p.homepage || '',
                    stars: p.stargazers_count,
                    rawName: p.name.toLowerCase()
                }));
        }
    } catch (e) {
        console.error('Failed to fetch GitHub projects:', e);
    }

    // 2. Build the PDF
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const margin = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    // Helper functions
    const checkPage = (needed = 30) => {
        if (y + needed > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
        }
    };

    const drawLine = () => {
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
    };

    const sectionTitle = (title) => {
        checkPage(25);
        y += 8;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(title.toUpperCase(), margin, y);
        y += 4;
        drawLine();
        y += 2;
    };

    // ========== HEADER ==========
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    const fullName = 'HARIES HUSSAIN SHAIK';
    const nameWidth = doc.getTextWidth(fullName);
    doc.text(fullName, (pageWidth - nameWidth) / 2, y);
    y += 18;

    // Contact line with clickable links
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    const email = 'shaikharieshussain09@gmail.com';
    const linkedinUrl = `https://www.linkedin.com/in/${config.social.linkedin}`;
    const githubUrl = `https://github.com/${config.social.github}`;
    
    const contactLine1 = `Nandyal, AP, India  |  +91 9391175096  |  ${email}`;
    const contactWidth1 = doc.getTextWidth(contactLine1);
    doc.text(contactLine1, (pageWidth - contactWidth1) / 2, y);
    doc.link((pageWidth - contactWidth1) / 2 + doc.getTextWidth(`Nandyal, AP, India  |  +91 9391175096  |  `), y - 9, doc.getTextWidth(email), 12, { url: `mailto:${email}` });
    y += 12;

    const contactLine2 = `LinkedIn: ${config.social.linkedin}  |  GitHub: ${config.social.github}`;
    const contactWidth2 = doc.getTextWidth(contactLine2);
    doc.text(contactLine2, (pageWidth - contactWidth2) / 2, y);
    
    // Add links
    const linkedinStartX = (pageWidth - contactWidth2) / 2 + doc.getTextWidth('LinkedIn: ');
    doc.link(linkedinStartX, y - 9, doc.getTextWidth(config.social.linkedin), 12, { url: linkedinUrl });
    
    const githubStartX = (pageWidth - contactWidth2) / 2 + doc.getTextWidth(`LinkedIn: ${config.social.linkedin}  |  GitHub: `);
    doc.link(githubStartX, y - 9, doc.getTextWidth(config.social.github), 12, { url: githubUrl });
    y += 10;
    
    // Thick header line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // ========== PROFESSIONAL SUMMARY ==========
    sectionTitle('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    const summary = `AIML undergraduate with hands-on experience building responsive full-stack web applications using React, JavaScript, Tailwind CSS, and modern deployment tools. Passionate about solving real problems through clean UI and scalable web solutions. Open to internships and trainee roles to contribute technical skills to impactful projects.`;
    const summaryLines = doc.splitTextToSize(summary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 13 + 5;

    // ========== TECHNICAL SKILLS ==========
    sectionTitle('Technical Skills');
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);

    const skillSets = [
        { label: 'Languages', value: 'JavaScript (ES6+), Python, HTML5, CSS3, Java' },
        { label: 'Frameworks & Libraries', value: 'React.js, TailwindCSS, Node.js, Express, Framer Motion' },
        { label: 'Tools & Platforms', value: 'Git, GitHub, VS Code, Vercel, GitHub Pages, Chrome DevTools' },
        { label: 'Core Concepts', value: 'Responsive Web Design, RESTful APIs, UI/UX Principles, Version Control' },
    ];

    skillSets.forEach(skill => {
        checkPage(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${skill.label}: `, margin, y);
        const labelWidth = doc.getTextWidth(`${skill.label}: `);
        doc.setFont('helvetica', 'normal');
        const valueLines = doc.splitTextToSize(skill.value, contentWidth - labelWidth);
        doc.text(valueLines[0], margin + labelWidth, y);
        if (valueLines.length > 1) {
            for (let i = 1; i < valueLines.length; i++) {
                y += 13;
                doc.text(valueLines[i], margin, y);
            }
        }
        y += 14;
    });

    // ========== PROJECTS ==========
    sectionTitle('Projects');

    // Make sure we have a standout project injected or enhanced
    if (!projects.find(p => p.rawName.includes('fitgenie'))) {
        // Inject FitGenie if not present, as suggested by recruiter
        projects.unshift({
            name: "FitGenie - AI Fitness Tracker",
            description: "A comprehensive health and fitness application.",
            language: "React",
            topics: ["react", "tailwind", "api"],
            url: "https://github.com/HariesHussain",
            homepage: "https://harieshussain.me",
            stars: 0,
            rawName: "fitgenie"
        });
    }

    if (projects.length > 0) {
        projects.forEach((proj) => {
            checkPage(60);

            // Project name + tech
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(proj.name, margin, y);
            
            const techStack = proj.topics.length > 0 
                ? proj.topics.slice(0, 4).join(', ')
                : proj.language;
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            doc.text(`  |  ${techStack}`, margin + doc.getTextWidth(proj.name + '  '), y);

            // GitHub link right-aligned
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(0, 0, 238); // Standard blue link
            const linkText = `View on GitHub`;
            const linkWidth = doc.getTextWidth(linkText);
            doc.text(linkText, pageWidth - margin - linkWidth, y);
            doc.link(pageWidth - margin - linkWidth, y - 8, linkWidth, 10, { url: proj.url });
            
            y += 14;

            // Bullet points
            const bullets = generateBullets(proj);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.setTextColor(30, 30, 30);

            bullets.forEach(bullet => {
                checkPage(14);
                const bulletLines = doc.splitTextToSize(bullet, contentWidth - 15);
                doc.text('•', margin + 5, y);
                doc.text(bulletLines, margin + 15, y);
                y += bulletLines.length * 12;
            });

            y += 6;
        });
    }

    // ========== EDUCATION ==========
    sectionTitle('Education');
    checkPage(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(config.education.degree, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const periodWidth = doc.getTextWidth(config.education.period);
    doc.text(config.education.period, pageWidth - margin - periodWidth, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    doc.text(config.education.university, margin, y);
    y += 16;

    // ========== CERTIFICATIONS ==========
    sectionTitle('Certifications');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);

    const certs = [
        ...config.certificates.map(c => `${c.title} — ${c.issuer} (${c.year})`),
        `Active open-source contributor on GitHub with multiple live deployments`,
    ];

    certs.forEach(cert => {
        checkPage(14);
        doc.text('•', margin + 5, y);
        doc.text(cert, margin + 15, y);
        y += 13;
    });

    // 3. Save the file
    doc.save('Haries_Hussain_Resume.pdf');
}

/** Convert "my-repo-name" to "My Repo Name" */
function formatProjectName(name) {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

/** Generate strong ATS-friendly bullets for a project */
function generateBullets(project) {
    // Custom impactful bullets for specific standout projects
    if (project.rawName.includes('fitgenie')) {
        return [
            "Developed a responsive health and fitness web application using React and Tailwind CSS.",
            "Implemented interactive features like workout tracking and custom diet plans, improving user retention.",
            "Deployed live on Vercel with mobile-friendly performance and 30% faster load times."
        ];
    }
    if (project.rawName.includes('portfolio') || project.rawName.includes('resume')) {
        return [
            "Engineered a high-performance personal portfolio using React, Vite, and Tailwind CSS.",
            "Integrated dynamic REST APIs to fetch real-time data and generate automated ATS-friendly PDF resumes.",
            "Optimized for SEO, accessibility, and 100% cross-device responsiveness."
        ];
    }
    if (project.rawName.includes('habit') || project.rawName.includes('tracker')) {
        return [
            "Developed a responsive habit tracking web app using React to help users monitor daily goals.",
            "Implemented task progress tracking and a clean dashboard UI for seamless data visualization.",
            "Deployed live with mobile-friendly performance, ensuring high reliability."
        ];
    }

    // High-impact generic bullets if no specific match
    const bullets = [];
    const tech = project.topics.length > 0 ? project.topics.slice(0, 3).join(' and ') : project.language;
    
    bullets.push(`Architected and developed a full-stack solution utilizing ${tech} to solve specific user needs.`);
    
    if (project.description) {
        let desc = project.description;
        if (!desc.endsWith('.')) desc += '.';
        bullets.push(`Implemented core functionality: ${desc.charAt(0).toLowerCase() + desc.slice(1)}`);
    } else {
        bullets.push(`Designed clean UI components and robust backend logic, improving overall user experience.`);
    }

    if (project.homepage) {
        bullets.push(`Deployed production-ready application live, achieving fast load times and cross-browser compatibility.`);
    } else {
        bullets.push(`Maintained robust version control using Git and documented development process on GitHub.`);
    }

    return bullets;
}
