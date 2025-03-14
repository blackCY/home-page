import React, { useState, useEffect } from 'react';
import './BackToTop.css';

interface BackToTopProps {
  threshold?: number;
  className?: string;
  showAfter?: number; // 显示按钮的滚动阈值（像素）
}

const BackToTop: React.FC<BackToTopProps> = ({ 
  threshold = 300, 
  className = '',
  showAfter = 300
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // 监听滚动事件，控制按钮显示
  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    // 初始检查
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);
  
  // 滚动到顶部
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button 
      className={`back-to-top ${isVisible ? 'visible' : ''} ${className}`}
      onClick={scrollToTop}
      aria-label="回到顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

export default BackToTop;
