import React from 'react';
import { motion } from 'framer-motion';
import '../styles/pages/AboutPage.css';

const AboutPage: React.FC = () => {
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
      className="about-page"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <div className="about-header">
          <h1 className="about-title">关于我</h1>
          <div className="about-subtitle">了解我的故事、技能和经历</div>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2 className="section-title">我的故事</h2>
            <div className="section-content">
              <p>
                欢迎来到我的个人网站！我是一名充满激情的开发者，热爱创造有意义的数字体验。
                我的旅程始于对技术的好奇心，这种好奇心驱使我不断学习和成长。
              </p>
              <p>
                多年来，我致力于将创意想法转化为现实，解决复杂问题，并创造出既美观又实用的解决方案。
                我相信技术的力量在于它改变生活和连接人们的能力。
              </p>
            </div>
          </div>

          <div className="about-section">
            <h2 className="section-title">专业技能</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>前端开发</h3>
                <ul className="skill-list">
                  <li>React & React Native</li>
                  <li>Vue.js</li>
                  <li>TypeScript</li>
                  <li>现代 CSS & Sass</li>
                  <li>响应式设计</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>后端开发</h3>
                <ul className="skill-list">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>SQL 数据库</li>
                  <li>RESTful API</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>工具 & 方法</h3>
                <ul className="skill-list">
                  <li>Git & GitHub</li>
                  <li>CI/CD</li>
                  <li>敏捷开发</li>
                  <li>测试驱动开发</li>
                  <li>用户体验设计</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="section-title">我的经历</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2022 - 至今</div>
                <div className="timeline-content">
                  <h3>高级前端开发工程师</h3>
                  <p>领导团队开发创新的 Web 应用程序，专注于性能优化和用户体验。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2019 - 2022</div>
                <div className="timeline-content">
                  <h3>全栈开发工程师</h3>
                  <p>设计和实现端到端解决方案，从数据库架构到前端界面。</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2017 - 2019</div>
                <div className="timeline-content">
                  <h3>Web 开发者</h3>
                  <p>构建响应式网站和 Web 应用程序，专注于现代前端技术。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
