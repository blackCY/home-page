import React from 'react';
import './Timeline.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Timeline = () => {
  // 使用滚动动画
  const sectionAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1
  });
  
  // 时间线数据
  const timelineData = [
    {
      type: 'experience',
      title: '高级前端开发工程师',
      organization: 'ABC科技有限公司',
      period: '2021年 - 至今',
      description: '负责公司核心产品的前端架构设计和开发，优化用户体验和性能，带领团队实施现代化前端技术栈。',
      achievements: [
        '重构了公司主要产品的前端架构，提升了性能和用户体验',
        '引入了组件化设计系统，提高了开发效率和代码复用性',
        '优化了前端构建流程，减少了50%的构建时间'
      ]
    },
    {
      type: 'education',
      title: '计算机科学硕士学位',
      organization: '北京大学',
      period: '2018年 - 2021年',
      description: '专注于人机交互和用户体验设计研究，参与多个研究项目和学术论文发表。',
      achievements: [
        '发表了2篇关于用户体验设计的学术论文',
        '获得了校级优秀毕业生奖项',
        '参与了多个产学研合作项目'
      ]
    },
    {
      type: 'experience',
      title: '前端开发工程师',
      organization: 'XYZ互联网公司',
      period: '2016年 - 2021年',
      description: '参与公司多个产品的前端开发，负责实现用户界面和交互功能，协作设计团队优化用户体验。',
      achievements: [
        '开发了公司核心产品的前端界面，获得了用户的高度评价',
        '实现了多个复杂的交互功能，提升了产品的用户体验',
        '优化了前端性能，提高了页面加载速度和响应性'
      ]
    },
    {
      type: 'education',
      title: '计算机科学学士学位',
      organization: '清华大学',
      period: '2012年 - 2016年',
      description: '主修计算机科学与技术，辅修设计学，参与多个校内外项目和比赛。',
      achievements: [
        '获得了校级优秀学生奖学金',
        '参与了多个校内外编程比赛并获奖',
        '担任了计算机协会的技术负责人'
      ]
    }
  ];
  
  return (
    <section 
      id="timeline" 
      className="timeline-section"
      ref={sectionAnimation.elementRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">我的经历</h2>
          <p className="section-subtitle">教育背景和工作经验</p>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {timelineData.map((item, index) => {
            // 为每个时间线项目创建滚动动画
            const itemAnimation = useScrollAnimation({
              animation: index % 2 === 0 ? 'fade-right' : 'fade-left',
              threshold: 0.1,
              delay: 200 * index
            });
            
            return (
              <div 
                key={index} 
                className={`timeline-item ${item.type} ${index % 2 === 0 ? 'left' : 'right'}`}
                ref={itemAnimation.elementRef}
                style={itemAnimation.style}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-type">{item.type === 'experience' ? '工作经验' : '教育背景'}</span>
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  
                  <h3 className="timeline-title">{item.title}</h3>
                  <h4 className="timeline-organization">{item.organization}</h4>
                  
                  <p className="timeline-description">{item.description}</p>
                  
                  <div className="timeline-achievements">
                    <h5 className="achievements-title">主要成就：</h5>
                    <ul className="achievements-list">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="achievement-item">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
