import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DropdownMenu.css';
import { NavItem } from '../../../types/common';

interface DropdownMenuProps {
  item: NavItem;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ item, className = '' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMenuHovered, setIsMenuHovered] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // 处理菜单按钮的鼠标进入
  const handleToggleMouseEnter = (): void => {
    setIsHovered(true);
  };
  
  // 处理菜单按钮的鼠标离开
  const handleToggleMouseLeave = (): void => {
    setIsHovered(false);
  };
  
  // 处理下拉菜单的鼠标进入
  const handleMenuMouseEnter = (): void => {
    setIsMenuHovered(true);
  };
  
  // 处理下拉菜单的鼠标离开
  const handleMenuMouseLeave = (): void => {
    setIsMenuHovered(false);
  };
  
  // 根据鼠标悬停状态更新下拉菜单的显示状态
  useEffect(() => {
    if (isHovered || isMenuHovered) {
      setIsOpen(true);
    } else {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 300); // 更长的延时确保更流畅的过渡
      
      return () => clearTimeout(timer);
    }
  }, [isHovered, isMenuHovered]);
  
  // 移动设备触摸事件支持
  useEffect(() => {
    const handleTouchStart = (e: Event): void => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
    
    const currentRef = dropdownRef.current;
    if (currentRef) {
      const toggleButton = currentRef.querySelector('.dropdown-toggle');
      if (toggleButton) {
        toggleButton.addEventListener('touchstart', handleTouchStart as EventListener);
      }
    }
    
    return () => {
      if (currentRef) {
        const toggleButton = currentRef.querySelector('.dropdown-toggle');
        if (toggleButton) {
          toggleButton.removeEventListener('touchstart', handleTouchStart as EventListener);
        }
      }
    };
  }, [isOpen]);
  
  return (
    <div 
      className={`dropdown-container ${className}`}
      ref={dropdownRef}
    >
      <button 
        className="dropdown-toggle nav-link" 
        aria-expanded={isOpen}
        aria-haspopup="true"
        onMouseEnter={handleToggleMouseEnter}
        onMouseLeave={handleToggleMouseLeave}
      >
        {item.title}
        <i className={`fas fa-chevron-down dropdown-icon ${isOpen ? 'open' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div 
          className="dropdown-menu"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="dropdown-header">
            <h3 className="header-title">我的创作</h3>
            <p className="header-description">探索我的项目作品集</p>
          </div>
          
          {item.dropdownItems?.map((dropdownItem, index) => (
            <Link 
              key={index} 
              to={dropdownItem.href} 
              className={`dropdown-item ${location.pathname === dropdownItem.href.split('?')[0] ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <div className="dropdown-item-image item-icon" style={{backgroundColor: dropdownItem.iconBg || '#f0f4ff'}}>
                {dropdownItem.icon ? (
                  <i className={dropdownItem.icon}></i>
                ) : dropdownItem.image ? (
                  <img src={dropdownItem.image} alt={dropdownItem.title} />
                ) : (
                  <span className="fallback-icon">{dropdownItem.title.charAt(0)}</span>
                )}
              </div>
              
              <div className="item-content">
                <h3>{dropdownItem.title}</h3>
                {dropdownItem.description && (
                  <p>{dropdownItem.description}</p>
                )}
              </div>
              
              <div className="arrow-icon">
                <i className="fas fa-chevron-right"></i>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
