document.addEventListener('DOMContentLoaded', () => {
    // 導覽列與進度條控制
    const nav = document.querySelector('nav');
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // 進度條計算
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // 視差滾動效果 (背景)
    const bgImages = document.querySelectorAll('.hero-bg, .emotion-bg, .data-bg');
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const yOffset = window.scrollY * 0.15;
            bgImages.forEach(img => {
                img.style.transform = `translateY(${yOffset}px)`;
            });
        });
    });

    // 滾動逐漸浮現動畫 (Intersection Observer)
    const fadeElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // 元素進入視窗底部上方 100px 時觸發
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 如果進入可見範圍
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 觸發後就不再觀察，確保動畫只播放一次
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
