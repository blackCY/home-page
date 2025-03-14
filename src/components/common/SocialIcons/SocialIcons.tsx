import React from 'react';
import './SocialIcons.css';
import { SocialLink } from '../../../types/common';

interface SocialIconsProps {
  className?: string;
  iconSize?: 'small' | 'medium' | 'large';
  color?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ 
  className = '', 
  iconSize = 'medium',
  color
}) => {
  const socialLinks: SocialLink[] = [
    { id: 'github', name: 'GitHub', url: 'https://github.com', icon: <i className="fab fa-github"></i> },
    { id: 'twitter', name: 'Twitter', url: 'https://twitter.com', icon: <i className="fab fa-twitter"></i> },
    { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com', icon: <i className="fab fa-linkedin-in"></i> },
    { id: 'instagram', name: 'Instagram', url: 'https://instagram.com', icon: <i className="fab fa-instagram"></i> }
  ];
  
  return (
    <div className={`social-icons ${className} size-${iconSize}`} style={color ? { color } : undefined}>
      {socialLinks.map((link) => (
        <a 
          key={link.id} 
          href={link.url} 
          className="social-icon" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={link.name}
        >
          {link.icon}
          <span className="social-icon-underline"></span>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
