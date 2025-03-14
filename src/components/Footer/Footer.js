import React from 'react';
import './Footer.css';
import SocialIcons from '../common/SocialIcons/SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // 页脚链接
  const footerLinks = [
    {
      title: '导航',
      links: [
        { name: '首页', href: '#home' },
        { name: '我的世界', href: '#my-world' },
        { name: '我的服务', href: '#services' },
        { name: '我的作品', href: '#projects' }
      ]
    },
    {
      title: '资源',
      links: [
        { name: 'Web 项目', href: '#web-projects' },
        { name: '移动应用', href: '#mobile-apps' },
        { name: 'AI 研究', href: '#ai-research' },
        { name: '开源贡献', href: '#open-source' }
      ]
    },
    {
      title: '关于',
      links: [
        { name: 'GitHub', href: 'https://github.com/username' },
        { name: '微信', href: 'https://weixin.qq.com' },
        { name: '邮箱', href: 'mailto:example@example.com' },
        { name: '隐私政策', href: '#privacy' }
      ]
    }
  ];
  
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <a href="#home" className="logo">
              <span className="logo-text">我的空间</span>
            </a>
            <p className="footer-tagline">探索、创造、分享</p>
          </div>
          
          <div className="footer-links">
            {footerLinks.map((group, index) => (
              <div key={index} className="footer-link-group">
                <h3 className="footer-link-title">{group.title}</h3>
                <ul className="footer-link-list">
                  {group.links.map((link, idx) => (
                    <li key={idx} className="footer-link-item">
                      <a href={link.href} className="footer-link">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="footer-newsletter">
            <h3 className="footer-newsletter-title">订阅我的通讯</h3>
            <p className="footer-newsletter-text">获取最新的文章、项目和资源更新</p>
            <form className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="footer-newsletter-input" 
                required 
              />
              <button type="submit" className="footer-newsletter-button">
                订阅
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} 我的个人空间. 保留所有权利.</p>
          </div>
          
          <div className="footer-social">
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
