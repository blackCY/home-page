import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './style.css';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // 模拟表单提交
    setTimeout(() => {
      // 在实际应用中，这里会是一个 API 调用
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // 5秒后重置状态
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

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
          <div className="contact-subtitle">有问题或项目合作？请随时联系我</div>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h3>电子邮件</h3>
              <p>hello@example.com</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3>电话</h3>
              <p>+86 123 4567 8910</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>地址</h3>
              <p>北京市朝阳区</p>
            </div>
            
            <div className="social-links">
              <h3>社交媒体</h3>
              <div className="social-icons">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>发送消息</h2>
            {formStatus === 'success' ? (
              <div className="form-success-message">
                <i className="fas fa-check-circle"></i>
                <h3>消息已发送！</h3>
                <p>感谢您的留言。我会尽快回复您。</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">电子邮件</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">主题</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">请选择...</option>
                    <option value="general">一般咨询</option>
                    <option value="project">项目合作</option>
                    <option value="job">工作机会</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">消息</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className="button-loader"></span>
                      发送中...
                    </>
                  ) : '发送消息'}
                </button>
                
                {formStatus === 'error' && (
                  <div className="form-error-message">
                    发送失败，请稍后再试。
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
