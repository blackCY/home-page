import React from 'react';
import './SocialIcons.css';

const SocialIcons = () => {
  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com', label: 'GitHub' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'fab fa-linkedin-in', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com', label: 'Instagram' }
  ];
  
  return (
    <div className="social-icons">
      {socialLinks.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          className="social-icon" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
