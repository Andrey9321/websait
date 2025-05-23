// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const categoriesMenu = document.querySelector('.categories-menu');

mobileMenuBtn.addEventListener('click', () => {
    categoriesMenu.style.display = categoriesMenu.style.display === 'none' ? 'block' : 'none';
});

if (window.innerWidth <= 768) {
    categoriesMenu.style.display = 'none';
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        categoriesMenu.style.display = 'block';
    } else {
        categoriesMenu.style.display = 'none';
    }
});

// Слайдер
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const slideCount = slides.length;

function goToSlide(slideIndex) {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    
    // Обновляем активную точку
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
}

// Автопереключение слайдов
let slideInterval = setInterval(nextSlide, 5000);

// Обработчики событий
nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000);
});

prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 5000);
});

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        goToSlide(slideIndex);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Пауза при наведении
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Прокрутка при клике на логотип
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Обработчик для кнопки карты
const mapButton = document.querySelector('.map-button');
if (mapButton) {
    mapButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://maps.app.goo.gl/exv3nHpZcYWPLr3D6', '_blank');
    });
}


// Показать/скрыть кнопку "Наверх"
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Наверх');
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 



// Обработчик для кнопки адреса магазина
const addressBtn = document.querySelector('.address-btn');
if (addressBtn) {
    addressBtn.addEventListener('click', () => {
        const shopInfoSection = document.querySelector('.shop-info-section');
        if (shopInfoSection) {
            window.scrollTo({
                top: shopInfoSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
}

// Модальное окно обратной связи
const feedbackModal = document.createElement('div');
feedbackModal.className = 'feedback-modal';
feedbackModal.innerHTML = `
    <div class="feedback-content">
        <span class="close-modal">&times;</span>
        <h3>Обратная связь</h3>
        <form id="feedback-form">
            <input type="text" placeholder="Ваше имя" required>
            <input type="email" placeholder="Ваш email" required>
            <textarea placeholder="Ваше сообщение" required></textarea>
            <button type="submit">Отправить</button>
        </form>
    </div>
`;
document.body.appendChild(feedbackModal);



// Создаем значок обратной связи
const feedbackIcon = document.createElement('div');
feedbackIcon.className = 'feedback-icon';
feedbackIcon.innerHTML = `
    <i class="fas fa-comment-alt"></i>
    <span class="feedback-tooltip">Обратная связь</span>
`;
document.body.appendChild(feedbackIcon);

// Добавляем иконку Font Awesome, если еще не подключена
if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(faLink);
}

// Открытие/закрытие модального окна
feedbackIcon.addEventListener('click', () => {
    feedbackModal.style.display = 'block';
});

document.querySelector('.close-modal').addEventListener('click', () => {
    feedbackModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === feedbackModal) {
        feedbackModal.style.display = 'none';
    }
});

// Обработка формы
document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    feedbackModal.style.display = 'none';
    e.target.reset();
});


const footerLogo = document.querySelector('.nav_logo');
if (footerLogo) {
    footerLogo.style.cursor = 'pointer';
    footerLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Корзина - адаптивная версия
const cartModal = document.createElement('div');
cartModal.className = 'cart-modal';
cartModal.innerHTML = `
    <div class="cart-content">
        <span class="close-cart">&times;</span>
        <div class="cart-header">
            <h3>Корзина</h3>
        </div>
        <div class="cart-items">
            <p class="empty-cart-message">Ваша корзина пуста</p>
        </div>
        <div class="cart-actions">
            <button class="continue-shopping">ПРОДОЛЖИТЬ ПОКУПКИ</button>
        </div>
    </div>
`;
document.body.appendChild(cartModal);

// Стили для корзины
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    
`;
document.head.appendChild(cartStyles);

// Обработчики событий для корзины
document.querySelectorAll('.icon-btn[aria-label="Корзина"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Блокируем скролл страницы при открытой корзине
        document.body.style.overflow = 'hidden';
        cartModal.classList.add('active');
    });
});

function closeCart() {
    document.body.style.overflow = '';
    cartModal.classList.remove('active');
}

document.querySelector('.close-cart').addEventListener('click', closeCart);
document.querySelector('.continue-shopping').addEventListener('click', closeCart);


// Закрытие корзины при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.classList.contains('active')) {
        closeCart();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.querySelector('.language-selector');
    const currentLang = document.querySelector('.language-current');
    const langDropdown = document.querySelector('.language-dropdown');
    
    if (!languageSelector || !currentLang || !langDropdown) return;
  
    // Обработчик открытия/закрытия меню
    currentLang.addEventListener('click', function(e) {
      e.stopPropagation();
      languageSelector.classList.toggle('active');
    });
  
    // Обработчик выбора языка
    langDropdown.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', function() {
        // Получаем данные выбранного языка
        const flag = this.querySelector('.language-flag').textContent;
        const code = this.getAttribute('data-lang').toUpperCase();
        const name = this.querySelector('.language-name').textContent;
        
        // Обновляем отображаемый язык
        currentLang.querySelector('.language-flag').textContent = flag;
        currentLang.querySelector('.language-code').textContent = code;
        
        // Закрываем меню
        languageSelector.classList.remove('active');
        
        // Можно добавить здесь уведомление (для демонстрации)
        console.log(`Выбран язык: ${name}`);
      });
    });
  
    // Закрытие при клике вне меню
    document.addEventListener('click', function() {
      languageSelector.classList.remove('active');
    });
  });


  