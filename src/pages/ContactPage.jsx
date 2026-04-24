import React from 'react';
import { HiMail, HiDownload } from 'react-icons/hi';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { config } from '../config.jsx';
import SEO from '../components/SEO';

const ContactPage = () => {
  return (
    <>
    <SEO
      title="Contact | Haries Hussain — Hire Web Developer in Mulanpeta, Nandyal"
      description="Want to hire Haries Hussain for an internship, freelance project, or collaboration? Get in touch with the top web developer in Mulanpeta street, Nandyal, AP."
      keywords="Hire web developer Mulanpeta street Nandyal, Mulanpeta freelance developer, Contact Haries Hussain Nandyal, AIML internship AP"
      path="/contact"
      schemaType="ContactPage"
    />
    <div className="pt-28 pb-12 md:pt-40 md:pb-24 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left: Messaging */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-full">
                  <HiMail className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Contact</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 display-font">
                  Get In Touch
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I'm actively seeking internship and entry-level positions in AI/ML and full-stack development. 
                  Let's connect and discuss how I can contribute to your team.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={config.contactInfo.find(c => c.label === 'Email')?.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
                >
                  <HiMail className="w-4 h-4" />
                  Email Me
                </a>
                <button
                  onClick={() => {
                    import('../utils/resumeGenerator.js').then(module => module.generateResumePDF());
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold text-sm hover:bg-gray-200 transition-colors"
                >
                  <HiDownload className="w-4 h-4" />
                  Resume
                </button>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.linkedin.com/in/${config.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a
                  href={`https://github.com/${config.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Contact Details Cards */}
            <div className="space-y-4">
              {config.contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link || '#'}
                  target={contact.link?.startsWith('http') ? "_blank" : undefined}
                  rel={contact.link?.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-all duration-300 shrink-0">
                    {contact.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{contact.label}</div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors truncate">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
