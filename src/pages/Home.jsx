import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

const Home = () => {
  return (
    <>
      <SEO
        title="Haries Hussain | AIML Student & Full Stack Developer"
        description="I'm Haries Hussain — an AI/ML engineering student & web developer in Nandyal. Explore my projects in machine learning & React. Open to internships."
        keywords="Haries Hussain Mulanpeta Nandyal, AIML Developer Mulanpeta, Web Developer in Mulanpeta street, React developer Nandyal"
        path="/"
        schemaType="ProfilePage"
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
    </>
  );
};

export default Home;
