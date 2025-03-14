import React, { useState } from 'react';
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
import { ParallaxContextType } from './types/common';

interface AppProps {
  className?: string;
}

const App: React.FC<AppProps> = ({ className = '' }) => {
  const [parallaxEnabled, setParallaxEnabled] = useState<boolean>(true);

  // 切换视差效果
  const toggleParallax = (): void => {
    setParallaxEnabled(prevState => !prevState);
  };

  // 创建视差上下文值
  const parallaxContextValue: ParallaxContextType = {
    enabled: parallaxEnabled,
    toggleParallax
  };

  return (
    <ThemeProvider>
      <ParallaxProvider value={parallaxContextValue}>
        <div className={`app-container ${className}`}>
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
};

export default App;
