import React from 'react';
import './SkillsSection.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const SkillsSection = () => {
  // 使用滚动动画
  const sectionAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1
  });
  
  // 技能数据
  const skillCategories = [
    {
      title: '前端开发',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Vue', level: 80 },
        { name: 'TypeScript', level: 75 }
      ]
    },
    {
      title: '设计能力',
      skills: [
        { name: 'UI/UX 设计', level: 90 },
        { name: 'Figma', level: 85 },
        { name: 'Adobe XD', level: 80 },
        { name: 'Photoshop', level: 75 },
        { name: 'Illustrator', level: 70 }
      ]
    },
    {
      title: '后端开发',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'SQL', level: 65 },
        { name: 'GraphQL', level: 60 }
      ]
    }
  ];
  
  // 其他技能
  const otherSkills = [
    '响应式设计', '动画效果', '性能优化', '跨浏览器兼容性',
    'Git', 'Webpack', 'SEO', '可访问性', '组件设计',
    '用户研究', '原型设计', '视觉设计', '交互设计'
  ];
  
  return (
    <section 
      id="skills" 
      className="skills-section"
      ref={sectionAnimation.elementRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">我的技能</h2>
          <p className="section-subtitle">专业技能和工具</p>
        </div>
        
        <div className="skills-content">
          <div className="skills-categories">
            {skillCategories.map((category, categoryIndex) => {
              // 为每个类别创建滚动动画
              const categoryAnimation = useScrollAnimation({
                animation: 'fade-up',
                threshold: 0.1,
                delay: 100 * categoryIndex
              });
              
              return (
                <div 
                  key={categoryIndex} 
                  className="skill-category"
                  ref={categoryAnimation.elementRef}
                  style={categoryAnimation.style}
                >
                  <h3 className="category-title">{category.title}</h3>
                  
                  <div className="skills-list">
                    {category.skills.map((skill, skillIndex) => {
                      // 为每个技能创建滚动动画
                      const skillAnimation = useScrollAnimation({
                        animation: 'fade-right',
                        threshold: 0.1,
                        delay: 100 * skillIndex + 200
                      });
                      
                      return (
                        <div 
                          key={skillIndex} 
                          className="skill-item"
                          ref={skillAnimation.elementRef}
                          style={skillAnimation.style}
                        >
                          <div className="skill-info">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-percentage">{skill.level}%</span>
                          </div>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ width: `${skill.level}%` }}
                              data-level={skill.level}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="other-skills">
            <h3 className="other-skills-title">其他技能</h3>
            <div className="other-skills-cloud">
              {otherSkills.map((skill, index) => {
                // 为每个其他技能创建滚动动画
                const otherSkillAnimation = useScrollAnimation({
                  animation: 'zoom-in',
                  threshold: 0.1,
                  delay: 50 * index
                });
                
                return (
                  <span 
                    key={index} 
                    className="other-skill-tag"
                    ref={otherSkillAnimation.elementRef}
                    style={otherSkillAnimation.style}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
