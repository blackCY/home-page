import React from 'react';
import './ThemeSwitch.css';
import { useTheme } from '../../../contexts/ThemeContext';
import { ThemeMode } from '../../../types/common';

interface ThemeSwitchProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ 
  className = '',
  showLabel = true
}) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={`theme-switch ${theme} ${className}`} 
      onClick={toggleTheme}
      aria-label={`切换到${theme === 'light' ? '暗色' : '亮色'}模式`}
    >
      <div className="switch-track">
        <div className="switch-thumb">
          {theme === 'light' ? (
            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </div>
      </div>
      {showLabel && <span className="switch-label">{theme === 'light' ? '亮色' : '暗色'}</span>}
    </button>
  );
};

export default ThemeSwitch;
