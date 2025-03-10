// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
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
