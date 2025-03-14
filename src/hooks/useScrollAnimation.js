import { useEffect, useRef, useState } from 'react';

/**
 * 滚动动画 Hook
 * @param {Object} options - 配置选项
 * @param {string} options.animation - 动画类名
 * @param {number} options.threshold - 触发阈值 (0-1)
 * @param {number} options.delay - 延迟时间 (ms)
 * @param {boolean} options.once - 是否只触发一次
 * @returns {Object} - 包含元素引用和动画状态
 */
const useScrollAnimation = (options = {}) => {
  const {
    animation = 'fade-in',
    threshold = 0.1,
    delay = 0,
    once = true
  } = options;
  
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 如果只触发一次且已经触发过，则不再触发
            if (once && hasAnimated) return;
            
            // 延迟应用动画类
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
            
            // 如果只触发一次，则取消观察
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // 如果不是只触发一次，则在元素离开视口时移除动画类
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );
    
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [animation, threshold, delay, once, hasAnimated]);
  
  // 生成动画类名
  const animationClass = isVisible ? animation : '';
  
  return {
    elementRef,
    isVisible,
    animationClass,
    style: {
      opacity: isVisible ? 1 : 0,
      transition: `opacity ${delay}ms ease-in-out`
    }
  };
};

export default useScrollAnimation;
