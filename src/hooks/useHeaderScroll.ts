import { useState, useEffect, CSSProperties } from 'react';

// 头部滚动选项接口
interface HeaderScrollOptions {
  threshold?: number;
  hideOnScroll?: boolean;
}

// 头部滚动钩子返回值接口
interface HeaderScrollReturn {
  isScrolled: boolean;
  isVisible: boolean;
  scrollY: number;
  style: CSSProperties;
}

/**
 * 头部滚动效果 Hook
 * @param {HeaderScrollOptions} options - 配置选项
 * @returns {HeaderScrollReturn} - 包含头部滚动状态
 */
const useHeaderScroll = (options: HeaderScrollOptions = {}): HeaderScrollReturn => {
  const {
    threshold = 50,
    hideOnScroll = false
  } = options;
  
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      
      // 判断是否超过阈值
      setIsScrolled(currentScrollY > threshold);
      
      // 判断滚动方向，决定是否显示头部
      if (hideOnScroll) {
        if (currentScrollY > lastScrollY) {
          // 向下滚动
          setIsVisible(false);
        } else {
          // 向上滚动
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始计算
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, hideOnScroll, lastScrollY]);
  
  return {
    isScrolled,
    isVisible,
    scrollY: lastScrollY,
    style: {
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out'
    }
  };
};

export default useHeaderScroll;
