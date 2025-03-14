import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 切换下拉菜单
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button 
        className="dropdown-toggle nav-link" 
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.title}
        <i className={`fas fa-chevron-down dropdown-icon ${isOpen ? 'open' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {item.dropdownItems.map((dropdownItem, index) => (
            <a 
              key={index} 
              href={dropdownItem.href} 
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              <div className="dropdown-item-content">
                {dropdownItem.image && (
                  <div className="dropdown-item-image">
                    <img src={dropdownItem.image} alt={dropdownItem.title} />
                  </div>
                )}
                <div className="dropdown-item-text">
                  <h4>{dropdownItem.title}</h4>
                  {dropdownItem.description && (
                    <p>{dropdownItem.description}</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
