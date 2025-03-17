import React from 'react';
import Hero from '../components/Hero/Hero';
import ParallaxSection from '../components/ParallaxSection/ParallaxSection';
import Services from '../components/Services/Services';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ParallaxSection />
      <Services />
      <ProjectsSection />
    </>
  );
};

export default HomePage;
