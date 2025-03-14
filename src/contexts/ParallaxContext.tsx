import React, { createContext, useContext, ReactNode } from 'react';

// 视差效果上下文类型定义
export interface ParallaxContextType {
  enabled: boolean;
  toggleParallax: () => void;
}

// 创建视差效果上下文，提供默认值
const ParallaxContext = createContext<ParallaxContextType>({
  enabled: true,
  toggleParallax: () => {}
});

// 视差效果提供者组件Props类型
interface ParallaxProviderProps {
  children: ReactNode;
  value: ParallaxContextType;
}

/**
 * 视差效果提供者组件
 * @param {ParallaxProviderProps} props - 组件属性
 * @returns {JSX.Element} 视差效果提供者组件
 */
export const ParallaxProvider: React.FC<ParallaxProviderProps> = ({ children, value }) => {
  return (
    <ParallaxContext.Provider value={value}>
      {children}
    </ParallaxContext.Provider>
  );
};

/**
 * 自定义 Hook 用于访问视差效果上下文
 * @returns {ParallaxContextType} 视差效果状态和方法
 */
export const useParallax = (): ParallaxContextType => {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
};

export default ParallaxContext;
