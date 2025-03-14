import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ParallaxSection from './components/ParallaxSection/ParallaxSection';
import AboutSection from './components/AboutSection/AboutSection';
import Services from './components/Services/Services';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import Timeline from './components/Timeline/Timeline';
import Testimonials from './components/Testimonials/Testimonials';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import BackToTop from './components/common/BackToTop/BackToTop';
import { ParallaxProvider } from './contexts/ParallaxContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [parallaxEnabled, setParallaxEnabled] = useState(true);

  // 切换视差效果
  const toggleParallax = () => {
    setParallaxEnabled(prevState => !prevState);
  };

  return (
    <ThemeProvider>
      <ParallaxProvider value={{ enabled: parallaxEnabled, toggleParallax }}>
        <div className="app-container">
          <Header />
          <main>
            <Hero />
            <ParallaxSection />
            <AboutSection />
            <Services />
            <ProjectsSection />
            <SkillsSection />
            <Timeline />
            <Testimonials />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default App;
