import React, { createContext, useContext } from 'react';
import useThemeSwitch from '../hooks/useThemeSwitch';

// 创建主题上下文
const ThemeContext = createContext();

/**
 * 主题提供者组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @returns {JSX.Element} 主题提供者组件
 */
export const ThemeProvider = ({ children }) => {
  // 使用主题切换钩子
  const themeState = useThemeSwitch();
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 使用主题上下文的自定义钩子
 * @returns {Object} 主题状态和方法
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme 必须在 ThemeProvider 内部使用');
  }
  return context;
};

export default ThemeContext;
