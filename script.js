document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. Логика 3D-переворота карточек ===
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

    // === 2. Логика Галереи Миниатюр ===
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
    
    // === 3. Логика Модального окна (Lightbox) ===
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

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('open');
        });
    }

    // === 4. Логика Анимации при Скролле ===
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => scrollObserver.observe(el));

    // === 5. ОТПРАВКА В TELEGRAM (Добавлено сюда для порядка) ===
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const token = '8538881535:AAG-2Q2ONQ6ozFdfmSk-DbWvbFSIDuHc7qE';
            const chatId = '6765147268'; 

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const text = `🚀 *Новая заявка!*\n\n👤 *Имя:* ${name}\n📞 *Тел:* ${phone}\n💬 *Сообщение:* ${message}`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown'
                })
            })
            .then(response => {
                if (response.ok) {
                    alert('Заявка успешно отправлена!');
                    form.reset();
                } else {
                    alert('Ошибка при отправке.');
                }
            })
            .catch(err => console.error('Ошибка:', err));
        });
    }

}); // Конец document.addEventListener