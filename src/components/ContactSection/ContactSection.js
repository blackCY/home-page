import React, { useState } from 'react';
import './ContactSection.css';
import AnimatedTitle from '../common/AnimatedTitle/AnimatedTitle';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 模拟表单提交
    setFormStatus({
      submitted: true,
      success: true,
      message: '感谢您的留言！我会尽快回复您。'
    });
    
    // 重置表单
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // 5秒后重置状态
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <AnimatedTitle 
          title="与我联系" 
          subtitle="有任何问题或合作意向，请随时联系我" 
          className="section-header"
        />
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-info-text">
                <h3>邮箱</h3>
                <p>example@example.com</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-info-text">
                <h3>地址</h3>
                <p>中国，北京</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-info-text">
                <h3>电话</h3>
                <p>+86 123 4567 8910</p>
              </div>
            </div>
            
            <div className="contact-decoration"></div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">主题</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">留言</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                发送留言 <i className="fas fa-paper-plane"></i>
              </button>
              
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
