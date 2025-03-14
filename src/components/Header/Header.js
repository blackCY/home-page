import React, { useState, useEffect } from 'react';
import './Header.css';
import DropdownMenu from '../common/DropdownMenu/DropdownMenu';
import ThemeSwitch from '../common/ThemeSwitch/ThemeSwitch';
import { FaGithub, FaWeixin, FaEnvelope } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // 使用更平滑的滚动检测
      if (scrollPosition > 30) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    };
    
    // 初始检查
    handleScroll();
    
    // 使用passive: true以提高性能
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  
  // 切换移动菜单
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // 导航项
  const navItems = [
    { title: '首页', href: '#home' },
    { title: '我的世界', href: '#my-world' },
    { title: '我的服务', href: '#services' },
    { 
      title: '我的作品', 
      href: '#projects',
      hasDropdown: true,
      dropdownItems: [
        { 
          title: '我的作品',
          href: '#projects',
          subtitle: '探索我的创意作品'
        },
        { 
          title: 'Web 项目', 
          href: '#web-projects',
          description: '响应式网站与前端应用开发',
          icon: 'fas fa-laptop-code',
          iconBg: '#eef1ff'
        },
        { 
          title: '移动应用', 
          href: '#mobile-apps',
          description: '原生与跨平台移动应用开发',
          icon: 'fas fa-mobile-alt',
          iconBg: '#e6f2ff'
        },
        { 
          title: 'AI 研究', 
          href: '#ai-research',
          description: '人工智能与机器学习探索',
          icon: 'fas fa-robot',
          iconBg: '#f3e8ff'
        },
        { 
          title: '开源贡献', 
          href: '#open-source',
          description: '开源社区项目与贡献',
          icon: 'fas fa-code-branch',
          iconBg: '#e6faff'
        }
      ]
    }
  ];
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          {/* Logo */}
          <a href="#home" className="logo">
            <img src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=100&auto=format&fit=crop&q=80" alt="网站Logo" className="logo-img" />
            <span className="logo-text">我的世界</span>
          </a>
        </div>
        
        {/* 中间导航 */}
        <nav className="main-nav">
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
        
        {/* 右侧社交图标 */}
        <div className="header-right">
          <div className="social-icons">
            <a href="https://github.com/username" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://weixin.qq.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaWeixin />
            </a>
            <a href="mailto:example@example.com" className="social-icon">
              <FaEnvelope />
            </a>
          </div>
          <ThemeSwitch />
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
