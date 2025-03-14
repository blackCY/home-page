import { ReactNode, CSSProperties } from 'react';

// 通用的子组件类型
export interface WithChildren {
  children?: ReactNode;
}

// 通用的类名类型
export interface WithClassName {
  className?: string;
}

// 组合通用类型
export type CommonProps = WithChildren & WithClassName;

// 主题类型
export type ThemeMode = 'light' | 'dark';

// 动画状态类型
export type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

// 项目类型
export interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

// 服务类型
export interface Service {
  id: string | number;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
}

// 服务数据类型 (用于 Services 组件)
export interface ServiceData {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

// 卡片数据类型 (用于 Card 组件)
export interface CardData {
  id: number;
  title: string;
  content: string;
  icon: string;
  color: string;
}

// 社交媒体类型
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: ReactNode;
}

// 导航项类型
export interface NavItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

// 下拉菜单项类型
export interface DropdownItem {
  id: string;
  title: string;
  href: string;
  description?: string;
  icon?: string;
  iconBg?: string;
  image?: string;
}

// 视差上下文类型
export interface ParallaxContextType {
  enabled: boolean;
  toggleParallax: () => void;
}

// 主题上下文类型
export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

// 滚动动画选项
export interface ScrollAnimationOptions {
  animation: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip';
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

// 滚动动画返回值
export interface ScrollAnimationResult {
  elementRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
  style: CSSProperties;
}

// 动画标题属性
export interface AnimatedTitleProps extends WithClassName {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  titleSize?: 'small' | 'medium' | 'large';
  subtitleSize?: 'small' | 'medium' | 'large';
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  delay?: number;
}
