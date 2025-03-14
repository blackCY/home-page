import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const dropdownRef = useRef(null);
  
  // 处理菜单按钮的鼠标进入
  const handleToggleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // 处理菜单按钮的鼠标离开
  const handleToggleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // 处理下拉菜单的鼠标进入
  const handleMenuMouseEnter = () => {
    setIsMenuHovered(true);
  };
  
  // 处理下拉菜单的鼠标离开
  const handleMenuMouseLeave = () => {
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
    const handleTouchStart = (e) => {
      e.preventDefault();
      setIsOpen(!isOpen);
    };
    
    const currentRef = dropdownRef.current;
    if (currentRef) {
      const toggleButton = currentRef.querySelector('.dropdown-toggle');
      if (toggleButton) {
        toggleButton.addEventListener('touchstart', handleTouchStart);
      }
    }
    
    return () => {
      if (currentRef) {
        const toggleButton = currentRef.querySelector('.dropdown-toggle');
        if (toggleButton) {
          toggleButton.removeEventListener('touchstart', handleTouchStart);
        }
      }
    };
  }, [isOpen]);
  
  return (
    <div 
      className="dropdown-container" 
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
          
          {item.dropdownItems.map((dropdownItem, index) => (
            <a 
              key={index} 
              href={dropdownItem.href} 
              className="dropdown-item"
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
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
