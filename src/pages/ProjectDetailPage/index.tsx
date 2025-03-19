import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './style.css';

// 模拟项目数据
const projectsData = [
  {
    id: '1',
    title: '个人作品集网站',
    category: 'Web 开发',
    date: '2023 年 3 月',
    client: '个人项目',
    description: '一个展示我个人作品和技能的响应式网站。使用 React、TypeScript 和 Framer Motion 构建，具有现代设计和流畅的动画效果。',
    challenge: '创建一个既能展示我的技术能力又能提供良好用户体验的平台。需要优化性能，确保在所有设备上都能流畅运行。',
    solution: '采用组件化架构，实现了高度可复用的 UI 组件。使用 React Context 管理全局状态，并利用 Framer Motion 创建流畅的过渡动画。针对移动设备进行了特别优化。',
    technologies: ['React', 'TypeScript', 'CSS3', 'Framer Motion', 'Responsive Design'],
    imageUrl: 'https://via.placeholder.com/800x500',
    gallery: [
      'https://via.placeholder.com/800x600?text=Screenshot+1',
      'https://via.placeholder.com/800x600?text=Screenshot+2',
      'https://via.placeholder.com/800x600?text=Screenshot+3'
    ],
    url: 'https://example.com'
  },
  {
    id: '2',
    title: '电子商务平台',
    category: '全栈开发',
    date: '2022 年 11 月',
    client: 'ABC 零售公司',
    description: '为零售客户开发的现代电子商务平台，具有产品目录、购物车、支付集成和用户账户管理功能。',
    challenge: '构建一个可扩展的平台，能够处理大量产品和并发用户，同时保持快速的加载时间和流畅的用户体验。',
    solution: '实现了微服务架构，使用 Node.js 和 Express 构建 API，React 构建前端界面，MongoDB 存储数据。采用了懒加载和图像优化技术来提高性能。',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Payment API Integration'],
    imageUrl: 'https://via.placeholder.com/800x500',
    gallery: [
      'https://via.placeholder.com/800x600?text=Store+Homepage',
      'https://via.placeholder.com/800x600?text=Product+Page',
      'https://via.placeholder.com/800x600?text=Checkout+Process'
    ],
    url: 'https://example-store.com'
  },
  {
    id: '3',
    title: '健康追踪应用',
    category: '移动应用开发',
    date: '2022 年 6 月',
    client: 'HealthFirst',
    description: '一款帮助用户追踪健康目标、记录运动和监控营养摄入的移动应用。包括数据可视化和进度报告功能。',
    challenge: '创建一个直观且易于使用的界面，同时处理复杂的健康数据和用户输入。确保数据的准确性和用户隐私。',
    solution: '使用 React Native 开发跨平台应用，实现了自定义图表组件来可视化用户数据。采用安全的数据存储方法，并集成了健康追踪 API。',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Chart.js', 'Health APIs', 'Firebase'],
    imageUrl: 'https://via.placeholder.com/800x500',
    gallery: [
      'https://via.placeholder.com/800x600?text=Dashboard',
      'https://via.placeholder.com/800x600?text=Tracking+Screen',
      'https://via.placeholder.com/800x600?text=Reports'
    ],
    url: 'https://healthapp-example.com'
  }
];

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 模拟从 API 获取数据
    const fetchProject = () => {
      setLoading(true);
      // 在实际应用中，这里会是一个 API 调用
      const foundProject = projectsData.find(p => p.id === id);
      
      setTimeout(() => {
        setProject(foundProject || null);
        setLoading(false);
      }, 500); // 模拟网络延迟
    };

    fetchProject();
  }, [id]);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="loader"></div>
        <p>加载项目信息...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>项目未找到</h2>
        <p>抱歉，我们找不到您请求的项目。</p>
        <Link to="/projects" className="btn-primary">返回项目列表</Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="project-detail-page"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
    >
      <div className="project-hero" style={{ backgroundImage: `url(${project.imageUrl})` }}>
        <div className="container">
          <h1 className="project-title">{project.title}</h1>
          <div className="project-category">{project.category}</div>
        </div>
      </div>

      <div className="container">
        <div className="project-content">
          <div className="project-info">
            <div className="info-item">
              <h3>日期</h3>
              <p>{project.date}</p>
            </div>
            <div className="info-item">
              <h3>客户</h3>
              <p>{project.client}</p>
            </div>
            <div className="info-item">
              <h3>技术</h3>
              <ul className="technologies-list">
                {project.technologies.map((tech: string, index: number) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            {project.url && (
              <div className="info-item">
                <h3>项目链接</h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                  访问项目
                </a>
              </div>
            )}
          </div>

          <div className="project-description">
            <section>
              <h2>项目概述</h2>
              <p>{project.description}</p>
            </section>

            <section>
              <h2>挑战</h2>
              <p>{project.challenge}</p>
            </section>

            <section>
              <h2>解决方案</h2>
              <p>{project.solution}</p>
            </section>

            <section className="project-gallery">
              <h2>项目展示</h2>
              <div className="gallery-grid">
                {project.gallery.map((image: string, index: number) => (
                  <div className="gallery-item" key={index}>
                    <img src={image} alt={`${project.title} - 截图 ${index + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="project-navigation">
          <Link to="/projects" className="btn-secondary">
            返回所有项目
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
