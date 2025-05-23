import React, { useEffect, useRef } from 'react';
import './Hero.css';

interface HeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const Hero: React.FC<HeroProps> = ({
  className = '',
  title = '我的个人空间',
  subtitle = '这里是我的数字花园，记录我的思考、创作和生活',
  buttonText = '探索我的世界'
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      // 计算鼠标相对于元素的位置（从中心点出发）
      const xPos = (clientX - left) / width - 0.5;
      const yPos = (clientY - top) / height - 0.5;
      
      // 应用微妙的倾斜效果
      const elements = heroRef.current.querySelectorAll('.hero-parallax');
      elements.forEach(el => {
        const speed = el.getAttribute('data-speed') || '1';
        const xOffset = xPos * parseFloat(speed) * 20;
        const yOffset = yPos * parseFloat(speed) * 20;
        (el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <section id="home" className={`hero-section ${className}`} ref={heroRef}>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">欢迎来到</span>
            <span className="hero-title-line gradient-text">{title}</span>
          </h1>
          <p className="hero-subtitle hero-parallax" data-speed="0.5">
            {subtitle}
          </p>
          <div className="hero-buttons">
            <a href="#my-world" className="hero-button primary hero-parallax" data-speed="0.3">
              {buttonText}
            </a>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-image hero-parallax" data-speed="0.8">
            {/* 这里可以放置一个装饰性图像 */}
            <div className="hero-decoration-1"></div>
            <div className="hero-decoration-2"></div>
            <div className="hero-decoration-3"></div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <a href="#my-world" className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
