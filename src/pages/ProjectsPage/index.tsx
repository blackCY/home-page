import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './style.css';

// 模拟项目数据
const projectsData = [
  {
    id: '1',
    title: '个人作品集网站',
    category: 'Web 开发',
    description: '一个展示我个人作品和技能的响应式网站。使用 React、TypeScript 和 Framer Motion 构建，具有现代设计和流畅的动画效果。',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    technologies: ['React', 'TypeScript', 'CSS3', 'Framer Motion']
  },
  {
    id: '2',
    title: '电子商务平台',
    category: '全栈开发',
    description: '为零售客户开发的现代电子商务平台，具有产品目录、购物车、支付集成和用户账户管理功能。',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB']
  },
  {
    id: '3',
    title: '健康追踪应用',
    category: '移动应用开发',
    description: '一款帮助用户追踪健康目标、记录运动和监控营养摄入的移动应用。包括数据可视化和进度报告功能。',
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1000&auto=format&fit=crop',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase']
  },
  {
    id: '4',
    title: '任务管理系统',
    category: 'Web 应用',
    description: '一个功能齐全的任务管理系统，帮助团队组织和跟踪项目进度。包括拖放界面、任务分配和截止日期提醒功能。',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    technologies: ['Vue.js', 'Vuex', 'Node.js', 'PostgreSQL']
  },
  {
    id: '5',
    title: '社交媒体仪表板',
    category: 'Web 开发',
    description: '一个综合性社交媒体管理仪表板，允许用户从单一界面管理多个社交媒体账户，包括内容发布和分析功能。',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop',
    technologies: ['React', 'Redux', 'Express', 'Social Media APIs']
  },
  {
    id: '6',
    title: '天气预报应用',
    category: '移动应用开发',
    description: '一款提供实时天气更新和预报的移动应用，具有位置跟踪、天气警报和交互式地图功能。',
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000&auto=format&fit=crop',
    technologies: ['Flutter', 'Dart', 'Weather API', 'Google Maps API']
  }
];

// 所有可用的类别
const allCategories = ['全部', ...Array.from(new Set<string>(projectsData.map(project => project.category)))];

const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 根据类别和搜索查询过滤项目
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = activeCategory === '全部' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <motion.div 
      className="projects-page"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container">
        <div className="projects-header">
          <h1 className="projects-title">我的作品</h1>
          <div className="projects-subtitle">探索我的创意项目和技术实现</div>
        </div>

        <div className="projects-filters">
          <div className="category-filters">
            {allCategories.map((category, index) => (
              <button
                key={index}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="search-filter">
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <h3>未找到匹配的项目</h3>
            <p>请尝试不同的搜索词或类别</p>
            <button 
              className="reset-button"
              onClick={() => {
                setActiveCategory('全部');
                setSearchQuery('');
              }}
            >
              重置筛选器
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                className="project-card"
                key={project.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={projectVariants}
              >
                <div className="project-image">
                  <img src={project.imageUrl} alt={project.title} />
                  <div className="project-overlay">
                    <Link to={`/projects/${project.id}`} className="view-project">
                      查看详情
                    </Link>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-category">{project.category}</div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="technology-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
