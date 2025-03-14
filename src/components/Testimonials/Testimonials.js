import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Testimonials = () => {
  // 使用滚动动画
  const sectionAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1
  });
  
  // 轮播状态
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  
  // 客户评价数据
  const testimonials = [
    {
      id: 1,
      name: '李明',
      position: 'ABC科技有限公司 CEO',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: '张三在我们公司的网站重设计项目中表现出色。他不仅理解了我们的需求，还提供了超出预期的创意解决方案。他的设计既美观又实用，大大提升了我们的用户体验和转化率。',
      rating: 5
    },
    {
      id: 2,
      name: '王芳',
      position: 'XYZ互联网公司 产品经理',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: '与张三合作是一次愉快的经历。他专业、高效，并且善于沟通。他开发的用户界面不仅美观，而且交互流畅，用户反馈非常积极。我们期待与他的进一步合作。',
      rating: 5
    },
    {
      id: 3,
      name: '赵强',
      position: '创新科技有限公司 技术总监',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      content: '张三是一位才华横溢的前端开发者。他对细节的关注和对用户体验的理解令人印象深刻。他不仅按时完成了项目，还提供了额外的优化建议，这些建议对我们的产品产生了积极影响。',
      rating: 4
    },
    {
      id: 4,
      name: '刘静',
      position: '全球电子商务 UI/UX主管',
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
      content: '作为设计团队的负责人，我非常欣赏张三的工作方式。他的代码整洁、模块化，并且遵循最佳实践。他的响应式设计确保了我们的网站在各种设备上都能完美展示。强烈推荐！',
      rating: 5
    }
  ];
  
  // 自动轮播
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);
  
  // 暂停/恢复自动轮播
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  // 手动切换轮播
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  // 上一张/下一张
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  
  // 生成星级评分
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };
  
  return (
    <section 
      id="testimonials" 
      className="testimonials-section"
      ref={sectionAnimation.elementRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">客户评价</h2>
          <p className="section-subtitle">听听他们怎么说</p>
        </div>
        
        <div 
          className="testimonials-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="testimonials-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {testimonials.map((testimonial, index) => {
              // 为每个评价创建滚动动画
              const testimonialAnimation = useScrollAnimation({
                animation: 'fade-up',
                threshold: 0.1,
                delay: 200 * index
              });
              
              return (
                <div 
                  key={testimonial.id} 
                  className={`testimonial-item ${index === currentSlide ? 'active' : ''}`}
                  ref={testimonialAnimation.elementRef}
                  style={testimonialAnimation.style}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-quote">
                      <svg className="quote-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" fill="currentColor"/>
                      </svg>
                      <p className="testimonial-text">{testimonial.content}</p>
                      <div className="testimonial-rating">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <img src={testimonial.avatar} alt={testimonial.name} />
                      </div>
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-position">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="carousel-controls">
            <button 
              className="carousel-control prev" 
              onClick={prevSlide}
              aria-label="上一个评价"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="carousel-indicators">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`转到评价 ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="carousel-control next" 
              onClick={nextSlide}
              aria-label="下一个评价"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
