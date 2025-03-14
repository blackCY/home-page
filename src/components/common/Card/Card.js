import React from 'react';
import './Card.css';

const Card = ({ title, content, icon, color, isParallax = false }) => {
  // 为每个卡片生成唯一的形状类名
  const getShapeClass = () => {
    const shapes = ['shape-rounded', 'shape-wavy', 'shape-curved', 'shape-angular', 'shape-organic', 'shape-blob'];
    const randomIndex = Math.floor(title.length % shapes.length);
    return shapes[randomIndex];
  };
  
  // 根据颜色生成类名
  const colorClass = `card-${color}`;
  const shapeClass = getShapeClass();
  
  return (
    <div className={`card ${colorClass} ${shapeClass} ${isParallax ? 'parallax-card' : ''}`}>
      <div className="card-inner">
        <div className="card-icon">
          <i className={icon}></i>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-content">{content}</p>
        <div className="card-action">
          <a href="#" className="card-link">
            了解更多 <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
