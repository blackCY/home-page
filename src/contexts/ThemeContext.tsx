import React, { createContext, useContext, ReactNode } from 'react';
import useThemeSwitch from '../hooks/useThemeSwitch';
import { ThemeMode } from '../types/common';

// 主题上下文类型定义
export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// 创建主题上下文，初始值为null
const ThemeContext = createContext<ThemeContextType | null>(null);

// 主题提供者组件Props类型
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 主题提供者组件
 * @param {ThemeProviderProps} props - 组件属性
 * @returns {JSX.Element} 主题提供者组件
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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
 * @returns {ThemeContextType} 主题状态和方法
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme 必须在 ThemeProvider 内部使用');
  }
  return context;
};

export default ThemeContext;
