import React from 'react';
import './Footer.css';
import { FaGithub, FaWeixin, FaEnvelope } from 'react-icons/fa';

interface QuickLink {
  name: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  // 快速链接
  const quickLinks: QuickLink[] = [
    { name: '首页', href: '#home' },
    { name: '我的世界', href: '#my-world' },
    { name: '我的服务', href: '#services' },
    { name: '我的作品', href: '#projects' }
  ];
  
  // 社交链接
  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, href: 'https://github.com/username', label: 'GitHub' },
    { icon: <FaWeixin />, href: 'https://weixin.qq.com', label: '微信' },
    { icon: <FaEnvelope />, href: 'mailto:example@example.com', label: '邮箱' }
  ];
  
  return (
    <footer className={`site-footer ${className}`}>
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-branding">
            <a href="#home" className="logo">
              <span className="logo-text">我的空间</span>
            </a>
            <p className="footer-tagline">探索、创造、分享</p>
          </div>
          
          <div className="footer-nav">
            <h3 className="footer-heading">快速导航</h3>
            <div className="footer-links-horizontal">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.href} className="footer-link">{link.name}</a>
              ))}
            </div>
          </div>
          
          <div className="footer-social-container">
            <h3 className="footer-heading">联系我</h3>
            <div className="footer-social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="footer-social-link" 
                  aria-label={link.label}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; {currentYear} 我的个人空间</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
