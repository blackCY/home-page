import React from 'react';
import './Services.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import AnimatedTitle from '../common/AnimatedTitle/AnimatedTitle';
import { ServiceData } from '../../types/common';

interface ServicesProps {
  className?: string;
}

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

const Services: React.FC<ServicesProps> = ({ className = '' }) => {
  // 使用滚动动画
  const sectionAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1
  });
  
  // 服务数据
  const servicesData: ServiceData[] = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: '网站设计与开发',
      description: '从概念到完成，提供全方位的网站设计和开发服务，包括响应式设计、前端开发和后端集成。',
      features: [
        '响应式网站设计',
        '前端开发（React, Vue, Angular）',
        '后端集成（Node.js, PHP）',
        'SEO优化',
        '网站性能优化'
      ]
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      title: 'UI/UX设计',
      description: '创建美观且用户友好的界面设计，注重用户体验和交互设计，确保产品既美观又实用。',
      features: [
        '用户界面设计',
        '用户体验研究',
        '交互设计',
        '原型设计',
        '可用性测试'
      ]
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      title: '移动应用开发',
      description: '开发高性能、用户友好的移动应用，支持iOS和Android平台，提供原生和跨平台解决方案。',
      features: [
        'iOS应用开发',
        'Android应用开发',
        '跨平台应用（React Native, Flutter）',
        '应用性能优化',
        '应用商店发布'
      ]
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: '咨询与培训',
      description: '提供前端开发和UI/UX设计领域的专业咨询和培训服务，帮助团队提升技能和知识。',
      features: [
        '技术咨询',
        '团队培训',
        '代码审查',
        '最佳实践指导',
        '技术选型建议'
      ]
    }
  ];
  
  return (
    <section 
      id="services" 
      className={`services-section ${className}`}
      ref={sectionAnimation.elementRef}
    >
      <div className="container">
        <AnimatedTitle 
          title="我的服务" 
          subtitle="专业解决方案，助力您的业务成功" 
          className="section-header"
        />
        
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// 提取为单独的组件以避免在回调中使用 Hook
const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  // 为每个服务创建滚动动画
  const serviceAnimation = useScrollAnimation({
    animation: 'fade-up',
    threshold: 0.1,
    delay: 200 * index
  });
  
  return (
    <div 
      className="service-card"
      ref={serviceAnimation.elementRef as React.RefObject<HTMLDivElement>}
      style={serviceAnimation.style}
    >
      <div className="service-icon">
        {service.icon}
      </div>
      
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      
      <ul className="service-features">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="feature-item">
            <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <a href="#contact" className="service-cta">
        <span>了解更多</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  );
};

export default Services;
