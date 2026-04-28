# Portfolio

A modern, responsive portfolio website built with **React 19**, **Vite**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- 📱 Fully responsive design with mobile-first approach
- ✨ Smooth animations and transitions
- 🎨 Modern UI with Tailwind CSS
- 📄 ATS-friendly resume generator with PDF export
- 🔍 SEO optimized with meta tags and structured data
- 🔗 GitHub API integration to display repositories
- ⚡ Lightning-fast performance with Vite
- 📊 Multiple portfolio sections (Hero, About, Experience, Projects, Skills)

## Tech Stack

- **Frontend:** React 19.2.0
- **Build Tool:** Vite 7.2.2
- **Styling:** Tailwind CSS 4.1.17
- **Animation:** Framer Motion 12.23.24
- **Routing:** React Router DOM 7.9.5
- **SEO:** React Helmet Async
- **Utilities:** jsPDF (PDF export), React Icons, SWR, date-fns

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Haries-portfolio.git
cd Haries-portfolio

# Install dependencies
npm install

# Update your information in src/config.jsx
# Start development server
npm run dev
```

Open [http://localhost:5173](http://harieshussain.tech) to view it in your browser.

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Route-based pages
├── utils/           # Utility functions
├── App.jsx          # Root component
├── config.jsx       # Configuration (update with your info)
└── main.jsx         # Entry point
```

## Configuration

Edit `src/config.jsx` to customize:

```javascript
export const config = {
  personal: {
    name: "Your Name",
    email: "your.email@example.com"
  },
  social: {
    github: "yourusername",
    linkedin: "your-profile"
  },
  // Add projects, skills, experience, etc.
}
```

## Features Explained

### Resume Generator
Generate multiple resume formats optimized for ATS (Applicant Tracking Systems) and export as PDF.
- Navigate to `/resume-generator`
- Select resume format
- Download as PDF

### GitHub Integration
Automatically displays your GitHub repositories. Make sure to set your GitHub username in `config.jsx`.

### SEO Optimization
- Meta tags and Open Graph support
- Schema.org structured data
- Sitemap and robots.txt included

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect GitHub repo to Vercel for auto-deployment
```

### Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### GitHub Pages
Update `vite.config.js` with your repository name and deploy the `dist` folder.

## License

MIT License - Use freely for personal or commercial projects.

## Contact

- **GitHub:** [yourusername](https://github.com/HariesHussain)
- **Email:** shaikharieshussain09.com

---

**Built with React & Vite** ⚡
