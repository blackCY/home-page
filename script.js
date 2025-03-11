// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化视差效果
    initParallaxEffect();
    
    // 移动端菜单开关
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('slide-down');
        });
    }
    
    // 桌面端下拉菜单动画增强
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        const parentLi = menu.closest('li');
        if (parentLi) {
            parentLi.addEventListener('mouseenter', () => {
                menu.style.zIndex = '100';
            });
            
            parentLi.addEventListener('mouseleave', () => {
                // 短暂延迟，使过渡动画更加平滑
                setTimeout(() => {
                    menu.style.zIndex = '';
                }, 300);
            });
        }
    });

    // 将所有卡片添加悬停效果类
    const cards = document.querySelectorAll('.rounded-xl.shadow-lg');
    cards.forEach(card => {
        card.classList.add('card-hover-effect');
    });

    // 为图片容器添加缩放效果
    const imageContainers = document.querySelectorAll('.md\\:w-1\\/2:has(img)');
    imageContainers.forEach(container => {
        container.classList.add('image-zoom');
    });

    // 为导航链接添加下划线动画 (只对没有特定类的链接应用)
    const navLinks = document.querySelectorAll('nav a:not(.nav-hover-effect):not(.nav-with-dropdown)');
    navLinks.forEach(link => {
        if (!link.closest('.dropdown-menu')) {
            link.classList.add('nav-underline');
        }
    });

    // 标题文字添加动画渐变效果
    const gradientTitle = document.querySelector('.text-transparent.bg-clip-text');
    if (gradientTitle) {
        gradientTitle.classList.add('animated-gradient-text');
    }

    // 平滑滚动实现
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 如果是在移动端菜单点击的链接，关闭菜单
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 页面滚动时为头部添加更多阴影
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
                header.classList.remove('shadow-sm');
            } else {
                header.classList.remove('shadow-md');
                header.classList.add('shadow-sm');
            }
        });
    }

    // 初始化动画元素
    animateOnScroll();
});

// 滚动时元素动画
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.grid > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        // 设置初始状态
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // 添加到观察者
        observer.observe(element);
    });
}

// 导航滚动处理函数
function handleNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 检查链接是否是下拉菜单的触发器
            if (link.classList.contains('nav-with-dropdown')) return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑固定导航栏的高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 视差效果初始化函数 - 增强版
function initParallaxEffect() {
    console.log('Initializing enhanced parallax effect');
    const parallaxSection = document.getElementById('projects');
    if (!parallaxSection) {
        console.log('Parallax section not found');
        return;
    }
    
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxTitle = document.querySelector('.parallax-title');
    const parallaxCards = document.querySelectorAll('.parallax-cards > div');
    
    // 初始化元素状态
    parallaxElements.forEach((element, index) => {
        // 添加初始随机位置，增强动态感
        const randomX = (Math.random() * 20 - 10);
        const randomY = (Math.random() * 20 - 10);
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    
    // 添加特效按钮
    const toggleEffectsButton = document.createElement('button');
    toggleEffectsButton.textContent = '视差效果: 开';
    toggleEffectsButton.className = 'fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-indigo-700 transition-colors';
    document.body.appendChild(toggleEffectsButton);
    
    let effectsEnabled = true;
    toggleEffectsButton.addEventListener('click', () => {
        effectsEnabled = !effectsEnabled;
        toggleEffectsButton.textContent = `视差效果: ${effectsEnabled ? '开' : '关'}`;
        toggleEffectsButton.className = `fixed bottom-4 right-4 ${effectsEnabled ? 'bg-indigo-600' : 'bg-gray-500'} text-white px-4 py-2 rounded-full shadow-lg z-50 hover:${effectsEnabled ? 'bg-indigo-700' : 'bg-gray-600'} transition-colors`;
        
        // 触发效果重置
        if (effectsEnabled) {
            window.dispatchEvent(new Event('scroll'));
        } else {
            // 重置所有元素
            parallaxElements.forEach(el => el.style.transform = '');
            if (parallaxTitle) parallaxTitle.style.transform = '';
            parallaxCards.forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        }
    });

    // 鼠标移动时的超强视差效果
    document.addEventListener('mousemove', function(e) {
        if (!effectsEnabled) return;
        
        // 即使不在视口中也应用一定程度的效果
        const isInViewport = isElementInViewport(parallaxSection);
        const effectStrength = isInViewport ? 1 : 0.3; // 在视口外时降低效果强度
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // 移动背景元素 - 超强效果
        parallaxElements.forEach((element, index) => {
            // 显著增大深度参数，使移动非常明显
            const depth = 0.3 + (index * 0.1);
            const moveX = (mouseX - 0.5) * depth * 300 * effectStrength;
            const moveY = (mouseY - 0.5) * depth * 300 * effectStrength;
            // 增强旋转和缩放效果，显著提升动态感
            const rotate = (mouseX - 0.5) * 20 * (index % 2 ? 1 : -1) * effectStrength;
            const scale = 1 + ((mouseY - 0.5) * 0.15 * effectStrength);
            element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotate}deg) scale(${scale})`;
        });
        
        // 移动标题 - 超强效果
        if (parallaxTitle) {
            const titleDepth = 0.15; // 显著增大深度
            const titleMoveX = (mouseX - 0.5) * titleDepth * 200 * effectStrength;
            const titleMoveY = (mouseY - 0.5) * titleDepth * 150 * effectStrength;
            const titleRotateZ = (mouseX - 0.5) * 5 * effectStrength; // 增强旋转效果
            parallaxTitle.style.transform = `translate3d(${titleMoveX}px, ${titleMoveY}px, 0) rotateZ(${titleRotateZ}deg)`;
            // 增强文本阴影效果，显著提升立体感
            const shadowX = (mouseX - 0.5) * 20;
            const shadowY = (mouseY - 0.5) * 20;
            parallaxTitle.style.textShadow = `${shadowX}px ${shadowY}px 15px rgba(79, 70, 229, 0.3), ${-shadowX/2}px ${-shadowY/2}px 10px rgba(124, 58, 237, 0.2)`;
        }
        
        // 移动卡片 - 超强效果
        parallaxCards.forEach((card, index) => {
            const isOdd = index % 2 === 0;
            const cardDepth = 0.08; // 显著增大深度
            // 显著增强旋转效果
            const cardRotateY = isOdd ? (mouseX - 0.5) * 25 * effectStrength : (0.5 - mouseX) * 25 * effectStrength;
            const cardRotateX = (mouseY - 0.5) * 15 * effectStrength; // 增强X轴旋转
            // 显著增强移动效果
            const cardMoveX = (mouseX - 0.5) * cardDepth * 250 * (isOdd ? 1 : -1) * effectStrength;
            const cardMoveY = (mouseY - 0.5) * cardDepth * 200 * effectStrength;
            // 使用transform3d来利用GPU加速
            card.style.transform = `translate3d(${cardMoveX}px, ${cardMoveY}px, 0) rotateY(${cardRotateY}deg) rotateX(${cardRotateX}deg)`;
            // 显著增强动态阴影效果，显著提升立体感
            const shadowBlur = 30 + Math.abs(cardRotateY) * 1.5;
            const shadowDistance = 20 + Math.abs(cardRotateY) * 0.8;
            card.style.boxShadow = `0 ${shadowDistance}px ${shadowBlur}px rgba(0, 0, 0, ${0.15 + Math.abs(cardRotateY) * 0.02})`;
        });
    });
    
    // 滚动时的超强视差效果
    window.addEventListener('scroll', function() {
        if (!effectsEnabled) return;
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const sectionTop = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        
        // 计算元素在视口中的位置百分比
        // -1表示在视口上方，0表示刚进入视口，1表示在视口中间，2表示即将离开视口
        const viewportPosition = (scrollPosition + windowHeight / 2 - sectionTop) / sectionHeight;
        
        // 在更大范围内应用效果，使过渡更平滑
        if (viewportPosition >= -0.8 && viewportPosition <= 1.8) {
            // 移动背景元素 - 超强效果
            parallaxElements.forEach((element, index) => {
                const depth = 0.4 + (index * 0.15); // 显著增大深度
                const moveY = (viewportPosition - 0.5) * depth * 300; // 显著增大移动距离
                const scale = 1 + Math.abs(viewportPosition - 0.5) * 0.2; // 显著增强缩放效果
                const rotate = (viewportPosition - 0.5) * 20 * (index % 2 ? 1 : -1); // 显著增强旋转效果
                
                // 结合鼠标移动效果和滚动效果
                const currentTransform = element.style.transform || '';
                const hasMouseEffect = currentTransform.includes('translate3d');
                
                if (hasMouseEffect) {
                    // 提取当前的X轴移动值
                    const currentX = parseFloat(currentTransform.match(/translate3d\(([^,]+),/)?.[1] || '0');
                    element.style.transform = `translate3d(${currentX}px, ${moveY}px, 0) rotate(${rotate}deg) scale(${scale})`;
                } else {
                    element.style.transform = `translate3d(0, ${moveY}px, 0) rotate(${rotate}deg) scale(${scale})`;
                }
            });
            
            // 滚动时的标题效果 - 超强效果
            if (parallaxTitle) {
                const titleEffect = Math.min(Math.abs(viewportPosition - 0.5) * 2, 1);
                parallaxTitle.style.opacity = 1 - titleEffect * 0.3; // 渐隐效果
                const titleScale = 1 + (0.5 - Math.abs(viewportPosition - 0.5)) * 0.3; // 增强缩放
                const titleRotate = (viewportPosition - 0.5) * -5; // 添加旋转
                parallaxTitle.style.transform = `scale(${titleScale}) translateY(${(viewportPosition - 0.5) * -80}px) rotateZ(${titleRotate}deg)`; // 增强移动距离
                
                // 添加颜色变化效果
                const hue = 240 + (viewportPosition - 0.5) * 30;
                parallaxTitle.style.color = `hsl(${hue}, 70%, 50%)`;
            }
            
            // 滚动时的卡片效果 - 超强逐个出现效果
            parallaxCards.forEach((card, index) => {
                const delay = index * 0.15; // 增大延迟
                const cardTiming = Math.max(0, Math.min(1, (viewportPosition + delay) * 1.5)); // 加快出现速度
                const isOdd = index % 2 === 0;
                
                // 从两侧滑入，增大距离
                const slideInX = isOdd ? 
                    (1 - cardTiming) * -150 : 
                    (1 - cardTiming) * 150;
                
                // 添加Y轴移动和旋转
                const slideInY = (1 - cardTiming) * 50;
                const rotate = isOdd ? 
                    (1 - cardTiming) * -10 : 
                    (1 - cardTiming) * 10;
                    
                // 增强透明度和缩放效果
                card.style.opacity = cardTiming;
                card.style.transform = `translate3d(${slideInX}px, ${slideInY}px, 0) scale(${0.7 + cardTiming * 0.3}) rotate(${rotate}deg)`;
                
                // 动态阴影
                const shadowDepth = cardTiming * 20;
                card.style.boxShadow = `0 ${shadowDepth}px ${shadowDepth * 1.5}px rgba(0, 0, 0, ${0.1 + cardTiming * 0.1})`;
            });
        }
    });
    
    // 触发初始滚动事件以应用效果
    window.dispatchEvent(new Event('scroll'));
}

// 检查元素是否在视口中
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}
