import { useState, useEffect, useRef } from 'react';

/**
 * 视差效果 Hook
 * @param {Object} options - 配置选项
 * @param {boolean} options.enabled - 是否启用视差效果
 * @param {number} options.speed - 视差速度系数
 * @param {string} options.direction - 视差方向 ('vertical', 'horizontal', 'both')
 * @returns {Object} - 包含视差效果相关状态和引用
 */
const useParallax = (options = {}) => {
  const {
    enabled = true,
    speed = 0.1,
    direction = 'vertical'
  } = options;
  
  const elementRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!enabled || !elementRef.current) return;
    
    // 创建 Intersection Observer 检测元素是否在视口内
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(elementRef.current);
    
    // 处理滚动事件
    const handleScroll = () => {
      if (!isInView) return;
      
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // 计算元素中心点相对于视口中心的位置
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      const centerX = rect.left + rect.width / 2 - window.innerWidth / 2;
      
      // 根据方向计算偏移量
      let offsetX = 0;
      let offsetY = 0;
      
      if (direction === 'vertical' || direction === 'both') {
        offsetY = centerY * speed;
      }
      
      if (direction === 'horizontal' || direction === 'both') {
        offsetX = centerX * speed;
      }
      
      setOffset({ x: offsetX, y: offsetY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // 初始计算
    handleScroll();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [enabled, speed, direction, isInView]);
  
  return {
    elementRef,
    offset,
    isInView,
    style: {
      transform: `translate(${offset.x}px, ${offset.y}px)`
    }
  };
};

export default useParallax;
