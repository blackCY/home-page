import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ParallaxSection from './components/ParallaxSection/ParallaxSection';
import Services from './components/Services/Services';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
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
            <Services />
            <ProjectsSection />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default App;
