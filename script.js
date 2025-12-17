document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Логика 3D-переворота карточек
    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            const flipContainer = button.closest('.flip-container');
            if (flipContainer) flipContainer.classList.toggle('flipped');
        });
    });

    // 2. Галерея Миниатюр
    const thumbnailGalleries = document.querySelectorAll('.thumbnail-gallery');
    thumbnailGalleries.forEach(gallery => {
        const thumbnails = gallery.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const clickedThumb = e.target;
                const flipContainer = clickedThumb.closest('.flip-container');
                const mainImage = flipContainer.querySelector('.main-house-image');
                if (mainImage) {
                    mainImage.src = clickedThumb.dataset.fullSrc; 
                    mainImage.dataset.caption = clickedThumb.dataset.caption;
                    thumbnails.forEach(t => t.classList.remove('active'));
                    clickedThumb.classList.add('active');
                }
                e.stopPropagation(); 
            });
        });
    });
    
    // 3. Лайтбокс (Модальное окно)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    document.body.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.zoomable')) {
            const img = e.target;
            lightbox.classList.add('open');
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.dataset.caption || img.alt;
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
    }

    // 4. Анимация появления
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => scrollObserver.observe(el));
});