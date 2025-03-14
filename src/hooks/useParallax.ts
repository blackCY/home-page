import { useState, useEffect, useRef, RefObject, CSSProperties } from 'react';

// 视差方向类型
type ParallaxDirection = 'vertical' | 'horizontal' | 'both';

// 视差选项接口
interface ParallaxOptions {
  enabled?: boolean;
  speed?: number;
  direction?: ParallaxDirection;
}

// 偏移量接口
interface Offset {
  x: number;
  y: number;
}

// 视差钩子返回值接口
interface ParallaxReturn {
  elementRef: RefObject<HTMLElement | null>;
  offset: Offset;
  isInView: boolean;
  style: CSSProperties;
}

/**
 * 视差效果 Hook
 * @param {ParallaxOptions} options - 配置选项
 * @returns {ParallaxReturn} - 包含视差效果相关状态和引用
 */
const useParallax = (options: ParallaxOptions = {}): ParallaxReturn => {
  const {
    enabled = true,
    speed = 0.1,
    direction = 'vertical'
  } = options;
  
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState<boolean>(false);
  
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
    const handleScroll = (): void => {
      if (!isInView || !elementRef.current) return;
      
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      
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
