/**
 * 动画工具函数
 */

/**
 * 线性插值函数
 * @param {number} start - 起始值
 * @param {number} end - 结束值
 * @param {number} t - 插值因子 (0-1)
 * @returns {number} - 插值结果
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

/**
 * 限制数值在指定范围内
 * @param {number} value - 输入值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 限制后的值
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * 将值从一个范围映射到另一个范围
 * @param {number} value - 输入值
 * @param {number} inMin - 输入范围最小值
 * @param {number} inMax - 输入范围最大值
 * @param {number} outMin - 输出范围最小值
 * @param {number} outMax - 输出范围最大值
 * @returns {number} - 映射后的值
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// 缓动函数类型
type EasingFunction = (t: number) => number;

/**
 * 缓动函数集合
 */
export const easing: Record<string, EasingFunction> = {
  // 线性
  linear: (t: number): number => t,
  
  // 缓入
  easeInQuad: (t: number): number => t * t,
  easeInCubic: (t: number): number => t * t * t,
  easeInQuart: (t: number): number => t * t * t * t,
  
  // 缓出
  easeOutQuad: (t: number): number => 1 - (1 - t) * (1 - t),
  easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeOutQuart: (t: number): number => 1 - Math.pow(1 - t, 4),
  
  // 缓入缓出
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInOutQuart: (t: number): number => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
};

// 视差方向类型
type ParallaxDirection = 'vertical' | 'horizontal' | 'both';

// 视差选项接口
interface ParallaxOptions {
  speed?: number;
  direction?: ParallaxDirection;
  reverse?: boolean;
  easeFunc?: EasingFunction;
}

/**
 * 应用视差效果
 * @param {HTMLElement} element - 目标元素
 * @param {number} scrollPosition - 当前滚动位置
 * @param {ParallaxOptions} options - 配置选项
 */
export const applyParallax = (
  element: HTMLElement | null,
  scrollPosition: number,
  options: ParallaxOptions = {}
): void => {
  const {
    speed = 0.1,
    direction = 'vertical',
    reverse = false,
    easeFunc = easing.linear
  } = options;
  
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  // 计算元素在视口中的位置 (0-1)
  const elementPosition = (rect.top + rect.height / 2) / viewportHeight;
  
  // 应用缓动函数
  const easedPosition = easeFunc(elementPosition);
  
  // 计算偏移量
  const offset = scrollPosition * speed * (reverse ? -1 : 1);
  
  // 应用变换
  if (direction === 'vertical') {
    element.style.transform = `translateY(${offset}px)`;
  } else if (direction === 'horizontal') {
    element.style.transform = `translateX(${offset}px)`;
  } else if (direction === 'both') {
    element.style.transform = `translate(${offset * 0.5}px, ${offset}px)`;
  }
};

// 滚动动画选项接口
interface ScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
  stagger?: number;
}

/**
 * 创建滚动触发动画
 * @param {HTMLElement} element - 目标元素
 * @param {string} animationClass - 动画类名
 * @param {ScrollAnimationOptions} options - 配置选项
 * @returns {Function} - 清理函数
 */
export const createScrollAnimation = (
  element: HTMLElement | null,
  animationClass: string,
  options: ScrollAnimationOptions = {}
): () => void => {
  const {
    threshold = 0.1,
    delay = 0,
    once = true
  } = options;
  
  if (!element) return () => {};
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add(animationClass);
          }, delay);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          element.classList.remove(animationClass);
        }
      });
    },
    { threshold }
  );
  
  observer.observe(element);
  
  return () => {
    observer.unobserve(element);
  };
};

/**
 * 批量应用滚动动画
 * @param {string} selector - 元素选择器
 * @param {string} animationClass - 动画类名
 * @param {ScrollAnimationOptions} options - 配置选项
 */
export const applyScrollAnimations = (
  selector: string,
  animationClass: string,
  options: ScrollAnimationOptions = {}
): () => void => {
  const elements = document.querySelectorAll(selector);
  const cleanupFunctions: Array<() => void> = [];
  
  elements.forEach((element, index) => {
    // 为每个元素应用不同的延迟
    const elementOptions = {
      ...options,
      delay: options.delay || 0 + (options.stagger || 0) * index
    };
    
    const cleanup = createScrollAnimation(element as HTMLElement, animationClass, elementOptions);
    cleanupFunctions.push(cleanup);
  });
  
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};
