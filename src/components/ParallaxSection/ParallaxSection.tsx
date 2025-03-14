import React, { useEffect, useRef } from 'react';
import './ParallaxSection.css';
import { useParallax } from '../../contexts/ParallaxContext';
import Card from '../common/Card/Card';
import AnimatedTitle from '../common/AnimatedTitle/AnimatedTitle';
import { CardData } from '../../types/common';

interface ParallaxSectionProps {
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ className = '' }) => {
  const { enabled, toggleParallax } = useParallax();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  
  // 卡片数据
  const cards: CardData[] = [
    {
      id: 1,
      title: '我的项目',
      content: '探索我的开源项目和个人作品，包括Web应用、移动应用和数据可视化项目。',
      icon: 'fas fa-code',
      color: 'indigo'
    },
    {
      id: 2,
      title: '我的博客',
      content: '阅读我关于技术、设计和创意的思考，以及我的学习笔记和教程分享。',
      icon: 'fas fa-pen-fancy',
      color: 'purple'
    },
    {
      id: 3,
      title: '我的摄影',
      content: '欣赏我的摄影作品，记录生活中的美好瞬间和旅行中的风景。',
      icon: 'fas fa-camera',
      color: 'blue'
    },
    {
      id: 4,
      title: '我的音乐',
      content: '聆听我创作的音乐和推荐的歌单，分享我对音乐的热爱。',
      icon: 'fas fa-music',
      color: 'green'
    },
    {
      id: 5,
      title: '我的阅读',
      content: '浏览我的书单和读书笔记，了解塑造我思想的书籍和文章。',
      icon: 'fas fa-book',
      color: 'amber'
    },
    {
      id: 6,
      title: '我的旅行',
      content: '跟随我的足迹，探索世界各地的文化、美食和风景。',
      icon: 'fas fa-plane',
      color: 'orange'
    }
  ];
  
  // 视差滚动效果
  useEffect(() => {
    if (!enabled || !sectionRef.current || !cardsRef.current) return;
    
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop || 0;
      const sectionHeight = sectionRef.current?.offsetHeight || 0;
      
      // 计算相对滚动位置
      const relativeScroll = scrollPosition - sectionTop + window.innerHeight;
      
      // 仅在视口内应用视差效果
      if (relativeScroll > 0 && scrollPosition < sectionTop + sectionHeight) {
        const cardElements = cardsRef.current?.querySelectorAll('.parallax-card');
        
        cardElements?.forEach((card, index) => {
          const speed = 0.05;
          const delay = index * 0.2;
          const yOffset = relativeScroll * speed * (1 + delay);
          const scale = 1 + (relativeScroll * 0.0001 * (1 + delay));
          const rotation = (index % 2 === 0 ? 1 : -1) * relativeScroll * 0.01 * speed;
          
          (card as HTMLElement).style.transform = `translateY(${yOffset}px) scale(${scale}) rotate(${rotation}deg)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled]);
  
  return (
    <section id="my-world" className={`parallax-section ${className}`} ref={sectionRef}>
      <div className="container parallax-container">
        <AnimatedTitle 
          title="我的世界" 
          subtitle="探索我的兴趣、爱好和创作" 
          className="section-header"
        />
        
        <div className="parallax-toggle-container">
          <button 
            className={`parallax-toggle ${enabled ? 'active' : ''}`} 
            onClick={toggleParallax}
            aria-label="Toggle parallax effect"
          >
            <span className="parallax-toggle-text">视差效果</span>
            <span className="parallax-toggle-slider"></span>
          </button>
        </div>
        
        <div className="parallax-cards" ref={cardsRef}>
          {cards.map((card) => (
            <Card 
              key={card.id} 
              title={card.title} 
              content={card.content} 
              icon={card.icon} 
              color={card.color}
              isParallax={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
