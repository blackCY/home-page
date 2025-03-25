import React from 'react';
import { motion } from 'framer-motion';
import './style.css';

const ContactPage: React.FC = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div 
      className="contact-page"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <div className="contact-header">
          <h1 className="contact-title">联系我</h1>
          <div className="contact-subtitle">欢迎通过以下方式与我取得联系</div>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="card-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>电子邮件</h3>
            <p>hello@example.com</p>
            <a href="mailto:hello@example.com" className="contact-link">
              发送邮件 <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>电话</h3>
            <p>+86 123 4567 8910</p>
            <a href="tel:+8612345678910" className="contact-link">
              拨打电话 <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="contact-card">
            <div className="card-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>办公地址</h3>
            <p>北京市朝阳区</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-link"
            >
              查看地图 <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className="contact-card social-card">
            <h3>社交媒体</h3>
            <div className="social-links">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://weibo.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Weibo"
              >
                <i className="fab fa-weibo"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
