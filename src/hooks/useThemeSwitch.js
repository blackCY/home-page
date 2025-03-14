import { useState, useEffect } from 'react';

/**
 * 主题切换 Hook
 * @param {string} defaultTheme - 默认主题 ('light' 或 'dark')
 * @returns {Object} - 包含当前主题和切换主题的函数
 */
const useThemeSwitch = (defaultTheme = 'light') => {
  // 从本地存储中获取保存的主题，如果没有则使用默认主题
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
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
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // 设置特定主题函数
  const setSpecificTheme = (newTheme) => {
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
