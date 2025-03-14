import { useEffect, useRef, useState } from 'react';

import { ScrollAnimationOptions, ScrollAnimationResult } from '../types/common';

// 滚动动画钩子返回值接口
interface ScrollAnimationReturn extends ScrollAnimationResult {
  animationClass: string;
}

/**
 * 滚动动画 Hook
 * @param {ScrollAnimationOptions} options - 配置选项
 * @returns {ScrollAnimationReturn} - 包含元素引用和动画状态
 */
const useScrollAnimation = (options: ScrollAnimationOptions): ScrollAnimationReturn => {
  const {
    animation = 'fade-in',
    threshold = 0.1,
    delay = 0,
    once = true
  } = options;
  
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  
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
  
  // 使用类型断言确保返回类型正确
  return {
    elementRef: elementRef as React.RefObject<HTMLElement>,
    isVisible,
    animationClass,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      // 只设置 opacity 和 transform 的 transition，不影响其他属性
      transition: `opacity ${delay}ms ease-in-out, transform ${delay}ms ease-in-out`
    }
  };
};

export default useScrollAnimation;
