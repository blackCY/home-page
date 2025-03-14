import { useState, useEffect } from 'react';
import { ThemeMode } from '../types/common';

/**
 * 主题切换 Hook 的返回类型
 */
export interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (newTheme: ThemeMode) => void;
  isDarkMode: boolean;
}

/**
 * 主题切换 Hook
 * @param {ThemeMode} defaultTheme - 默认主题 ('light' 或 'dark')
 * @returns {ThemeState} - 包含当前主题和切换主题的函数
 */
const useThemeSwitch = (defaultTheme: ThemeMode = 'light'): ThemeState => {
  // 从本地存储中获取保存的主题，如果没有则使用默认主题
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    return savedTheme || defaultTheme;
  });
  
  // 当主题变化时，更新文档根元素的类名和本地存储
  useEffect(() => {
    const root = document.documentElement;
    
    // 移除所有主题相关的类
    root.classList.remove('theme-light', 'theme-dark');
    
    // 添加当前主题的类
    root.classList.add(`theme-${theme}`);
    
    // 保存到本地存储
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // 切换主题函数
  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // 设置特定主题函数
  const setSpecificTheme = (newTheme: ThemeMode): void => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  };
  
  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDarkMode: theme === 'dark'
  };
};

export default useThemeSwitch;
