import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import './AnimatedTitle.css';

interface MousePosition {
  x: number;
  y: number;
}

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  title, 
  subtitle, 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);

  // 处理滚动显示效果
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = titleRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // 处理鼠标移动效果
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!titleRef.current) return;
    
    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <div 
      ref={titleRef}
      className={`animated-title-container ${className} ${isVisible ? 'visible' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="title-glow"
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`
        } as CSSProperties}
      ></div>
      <h2 className="animated-title">{title}</h2>
      {subtitle && <p className="animated-subtitle">{subtitle}</p>}
    </div>
  );
};

export default AnimatedTitle;
