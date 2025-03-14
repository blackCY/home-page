import React, { useState } from 'react';
import './ProjectsSection.css';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import AnimatedTitle from '../common/AnimatedTitle/AnimatedTitle';

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // 使用滚动动画
  const sectionAnimation = useScrollAnimation({
    animation: 'fade-in',
    threshold: 0.1
  });
  
  // 项目类别
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'web', name: '网站设计' },
    { id: 'app', name: '应用程序' },
    { id: 'ui', name: 'UI/UX' },
    { id: 'other', name: '其他' }
  ];
  
  // 项目数据
  const projects = [
    {
      id: 1,
      title: '个人网站设计',
      category: 'web',
      image: 'https://via.placeholder.com/600x400',
      description: '使用 React 和现代 CSS 技术构建的响应式个人网站',
      link: '#'
    },
    {
      id: 2,
      title: '电商应用界面',
      category: 'ui',
      image: 'https://via.placeholder.com/600x400',
      description: '为电子商务平台设计的现代化用户界面',
      link: '#'
    },
    {
      id: 3,
      title: '旅行应用程序',
      category: 'app',
      image: 'https://via.placeholder.com/600x400',
      description: '帮助用户规划旅行的移动应用程序',
      link: '#'
    },
    {
      id: 4,
      title: '数据可视化平台',
      category: 'web',
      image: 'https://via.placeholder.com/600x400',
      description: '使用 D3.js 构建的交互式数据可视化平台',
      link: '#'
    },
    {
      id: 5,
      title: '品牌标识设计',
      category: 'other',
      image: 'https://via.placeholder.com/600x400',
      description: '为科技初创公司设计的品牌标识和视觉系统',
      link: '#'
    },
    {
      id: 6,
      title: '社交媒体应用',
      category: 'app',
      image: 'https://via.placeholder.com/600x400',
      description: '基于位置的社交媒体应用程序',
      link: '#'
    }
  ];
  
  // 根据当前选中的类别过滤项目
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // 处理类别切换
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <section 
      id="projects" 
      className="projects-section"
      ref={sectionAnimation.elementRef}
    >
      <div className="container">
        <AnimatedTitle 
          title="我的作品" 
          subtitle="探索我的创意项目和设计作品" 
          className="section-header"
        />
        
        <div className="projects-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              categories={categories}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// 提取为单独的组件以避免在回调中使用 Hook
const ProjectCard = ({ project, index, categories }) => {
  // 为每个项目创建单独的动画
  const projectAnimation = useScrollAnimation({
    animation: 'fade-up',
    threshold: 0.1,
    delay: 100 * index
  });
  
  return (
    <div 
      className="project-card"
      ref={projectAnimation.elementRef}
      style={projectAnimation.style}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <button 
            onClick={() => window.open(project.link, '_blank')} 
            className="project-link"
          >
            查看详情
          </button>
        </div>
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-category">{categories.find(c => c.id === project.category).name}</p>
        <p className="project-description">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectsSection;
