import React from 'react';
import './AboutSection.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const AboutSection = () => {
  // 使用滚动动画
  const sectionAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1
  });
  
  // 左侧内容动画
  const contentAnimation = useScrollAnimation({
    animation: 'fade-right',
    threshold: 0.1,
    delay: 200
  });
  
  // 右侧图片动画
  const imageAnimation = useScrollAnimation({
    animation: 'fade-left',
    threshold: 0.1,
    delay: 400
  });
  
  // 个人信息
  const personalInfo = [
    { label: '姓名', value: '张三' },
    { label: '出生日期', value: '1990年1月1日' },
    { label: '电话', value: '+86 123 4567 8910' },
    { label: '邮箱', value: 'example@example.com' },
    { label: '地址', value: '中国，北京' },
    { label: '职业', value: '前端开发工程师 / UI设计师' }
  ];
  
  return (
    <section 
      id="about" 
      className="about-section"
      ref={sectionAnimation.elementRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">关于我</h2>
          <p className="section-subtitle">了解更多关于我的信息</p>
        </div>
        
        <div className="about-content">
          <div 
            className="about-text"
            ref={contentAnimation.elementRef}
            style={contentAnimation.style}
          >
            <h3 className="about-greeting">你好，我是<span className="highlight">张三</span></h3>
            <p className="about-description">
              我是一名充满激情的前端开发工程师和UI设计师，拥有5年的行业经验。我专注于创建美观、实用且具有良好用户体验的网站和应用程序。
            </p>
            <p className="about-description">
              我热爱将创意想法转化为现实，并且不断学习新技术来提升自己的技能。在我的职业生涯中，我参与开发了多个大型项目，涵盖电子商务、社交媒体和企业应用等领域。
            </p>
            
            <div className="personal-info">
              <h4 className="info-title">个人信息</h4>
              <ul className="info-list">
                {personalInfo.map((info, index) => (
                  <li key={index} className="info-item">
                    <span className="info-label">{info.label}:</span>
                    <span className="info-value">{info.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="about-cta">
              <a href="#contact" className="btn btn-primary">联系我</a>
              <a href="#" className="btn btn-secondary">下载简历</a>
            </div>
          </div>
          
          <div 
            className="about-image"
            ref={imageAnimation.elementRef}
            style={imageAnimation.style}
          >
            <div className="image-container">
              <img src="https://via.placeholder.com/500x600" alt="个人照片" />
              <div className="image-decoration"></div>
            </div>
            
            <div className="experience-counter">
              <div className="counter-item">
                <span className="counter-number">5+</span>
                <span className="counter-text">年经验</span>
              </div>
              <div className="counter-item">
                <span className="counter-number">50+</span>
                <span className="counter-text">完成项目</span>
              </div>
              <div className="counter-item">
                <span className="counter-number">30+</span>
                <span className="counter-text">满意客户</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
