import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BackToTop from './components/common/BackToTop/BackToTop';
import { ParallaxProvider } from './contexts/ParallaxContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ParallaxContextType } from './types/common';

// 页面组件
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </ParallaxProvider>
    </ThemeProvider>
  );
};

export default App;
