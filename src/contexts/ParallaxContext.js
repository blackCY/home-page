import React, { createContext, useContext } from 'react';

// 创建视差效果上下文
const ParallaxContext = createContext({
  enabled: true,
  toggleParallax: () => {}
});

// 视差效果提供者组件
export const ParallaxProvider = ({ children, value }) => {
  return (
    <ParallaxContext.Provider value={value}>
      {children}
    </ParallaxContext.Provider>
  );
};

// 自定义 Hook 用于访问视差效果上下文
export const useParallax = () => {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
};

export default ParallaxContext;
