import React, { useState, useEffect } from 'react';
import './Header.css';
import DropdownMenu from '../common/DropdownMenu/DropdownMenu';
import SocialIcons from '../common/SocialIcons/SocialIcons';
import ThemeSwitch from '../common/ThemeSwitch/ThemeSwitch';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // 切换移动菜单
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // 导航项
  const navItems = [
    { title: '首页', href: '#home' },
    { title: '我的世界', href: '#my-world' },
    { 
      title: '我的作品', 
      href: '#projects',
      hasDropdown: true,
      dropdownItems: [
        { 
          title: '个人网站', 
          href: '#personal-website',
          image: '/images/project1.jpg',
          description: '使用现代技术栈构建的个人展示网站' 
        },
        { 
          title: '数据可视化', 
          href: '#data-viz',
          image: '/images/project2.jpg',
          description: '基于大数据的交互式可视化项目' 
        },
        { 
          title: 'AI应用', 
          href: '#ai-app',
          image: '/images/project3.jpg',
          description: '结合机器学习的智能应用程序' 
        }
      ]
    },
    { title: '与我联系', href: '#contact' }
  ];
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <a href="#home" className="logo">
          <span className="logo-text">我的空间</span>
        </a>
        
        {/* 桌面导航 */}
        <nav className="main-nav desktop-nav">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.hasDropdown ? (
                  <DropdownMenu item={item} />
                ) : (
                  <a href={item.href} className="nav-link">{item.title}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* 社交图标和主题切换 */}
        <div className="header-actions">
          <ThemeSwitch />
          <div className="social-icons-wrapper">
            <SocialIcons />
          </div>
        </div>
        
        {/* 移动菜单按钮 */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* 移动导航 */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="mobile-nav-item">
                <a 
                  href={item.href} 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </a>
                {item.hasDropdown && (
                  <ul className="mobile-dropdown">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <li key={idx} className="mobile-dropdown-item">
                        <a 
                          href={dropdownItem.href} 
                          className="mobile-dropdown-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
