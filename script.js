document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================================
    // === 1. Логика 3D-переворота карточек ===
    // ===================================================
    const flipButtons = document.querySelectorAll('.flip-btn');

    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            e.stopPropagation(); 

            const flipContainer = button.closest('.flip-container');
            
            if (flipContainer) {
                flipContainer.classList.toggle('flipped');
            }
        });
    });

    // ===================================================
    // === 2. Логика Галереи Миниатюр ===
    // ===================================================
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
    
    // ===================================================
    // === 3. Логика Модального окна (Lightbox) ===
    // ===================================================
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
            
            if (img.classList.contains('plan-image')) {
                 lightboxImg.style.objectFit = 'contain';
                 lightboxImg.style.backgroundColor = '#222'; 
            } else {
                 lightboxImg.style.objectFit = 'cover';
                 lightboxImg.style.backgroundColor = 'transparent';
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            lightbox.classList.remove('open');
        }
    });

    // ===================================================
    // === 4. Логика Обработки Формы (ЗАГЛУШКА) ===
    // ===================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Получаем данные
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            console.log(`Заявка получена от: ${name}, Телефон: ${phone}, Сообщение: ${message}`);

            // 1. Отображаем сообщение об успехе
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Спасибо! Заявка отправлена!';
            submitButton.style.backgroundColor = '#4CAF50'; // Зеленый цвет успеха
            submitButton.disabled = true;

            // 2. Очищаем форму
            contactForm.reset(); 

            // 3. Отменяем изменения через 3 секунды
            setTimeout(() => {
                submitButton.textContent = 'Отправить заявку';
                submitButton.style.backgroundColor = '#00897b'; // Возвращаем исходный цвет
                submitButton.disabled = false;
            }, 3000);
        });
    }
    
    // ===================================================
    // === 5. Логика Анимации при Скролле (Scroll Reveal) ===
    // ===================================================
    
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 // Порог видимости 20%
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если элемент вошел в зону видимости
                entry.target.classList.add('visible');
                // Прекращаем наблюдение
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

}); // Конец document.addEventListener