import React from "react";
import { FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { config } from "../config.jsx";
import SEO from '../components/SEO';

const Certificates = () => {
    return (
        <>
        <SEO
            title="Certifications | Haries Hussain — Certified AI Developer in Mulanpeta, Nandyal"
            description="View Haries Hussain's professional certifications in Web Development, Machine Learning, and Generative AI. Local developer based in Mulanpeta, Nandyal, AP."
            keywords="Certified AI developer Nandyal, Mulanpeta local IT credentials, Haries Hussain certificates, AIML Mulanpeta"
            path="/certificates"
            schemaType="CollectionPage"
        />
        <section className="pt-28 pb-12 md:pt-40 md:pb-24 bg-white">
            <div className="w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-full">
                        <HiAcademicCap className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Credentials</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 display-font">
                        Certifications
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Professional certifications and courses I've completed to strengthen my technical expertise.
                    </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {config.certificates.map((cert, index) => (
                        <a
                            key={index}
                            href={cert.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white border border-gray-200 hover:border-indigo-200 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-start gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                <FaFilePdf className="text-red-500 text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-semibold text-gray-900 display-font group-hover:text-indigo-600 transition-colors">{cert.title}</h3>
                                    <FaExternalLinkAlt className="w-3 h-3 text-gray-300 group-hover:text-indigo-500 transition-colors shrink-0 mt-1.5" />
                                </div>
                                <p className="text-gray-500 text-sm mt-1">
                                    {cert.issuer} &middot; {cert.year}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default Certificates;
