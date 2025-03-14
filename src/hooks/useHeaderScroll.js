import { useState, useEffect } from 'react';

/**
 * 头部滚动效果 Hook
 * @param {Object} options - 配置选项
 * @param {number} options.threshold - 滚动阈值，超过该值时应用效果
 * @param {boolean} options.hideOnScroll - 是否在向下滚动时隐藏头部
 * @returns {Object} - 包含头部滚动状态
 */
const useHeaderScroll = (options = {}) => {
  const {
    threshold = 50,
    hideOnScroll = false
  } = options;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
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
