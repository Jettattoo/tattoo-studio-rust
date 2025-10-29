// Данные приложения
const portfolioData = [
    {
        id: 1,
        title: 'Роза в реализме',
        image: 'https://via.placeholder.com/300x200?text=Rose+Tattoo',
        style: 'Реализм',
        artist: 'Анна',
        location: 'Рука'
    },
    {
        id: 2,
        title: 'Дракон Tribal',
        image: 'https://via.placeholder.com/300x200?text=Dragon+Tribal',
        style: 'Tribal',
        artist: 'Иван',
        location: 'Спина'
    },
    {
        id: 3,
        title: 'Old School Птица',
        image: 'https://via.placeholder.com/300x200?text=Old+School+Bird',
        style: 'Old School',
        artist: 'Мария',
        location: 'Рука'
    },
    {
        id: 4,
        title: 'Геометрический узор',
        image: 'https://via.placeholder.com/300x200?text=Geometric',
        style: 'Геометрия',
        artist: 'Анна',
        location: 'Нога'
    }
];

const artistsData = [
    {
        id: 1,
        name: 'Анна',
        specialization: ['Реализм', 'Портреты'],
        experience: '8 лет',
        photo: 'https://via.placeholder.com/100?text=Artist+1',
        description: 'Специализируюсь на реалистичных татуировках и портретах.'
    },
    {
        id: 2,
        name: 'Иван',
        specialization: ['Old School', 'Neo Traditional'],
        experience: '10 лет',
        photo: 'https://via.placeholder.com/100?text=Artist+2',
        description: 'Классический и современный стиль.'
    },
    {
        id: 3,
        name: 'Мария',
        specialization: ['Tribal', 'Геометрия'],
        experience: '6 лет',
        photo: 'https://via.placeholder.com/100?text=Artist+3',
        description: 'Графические и геометрические узоры.'
    }
];

// Показать экран
function showScreen(screenId) {
    // Скрыть все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показать нужный экран
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

// Главная
function showHome() {
    showScreen('home');
}

// Портфолио
function showPortfolio() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('portfolio');
    }
    showScreen('portfolio');
    loadPortfolio();
}

function loadPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = '';
    
    portfolioData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-item-info">
                <h3>${item.title}</h3>
                <p>${item.artist} • ${item.style}</p>
            </div>
        `;
        grid.appendChild(div);
    });
}

// Запись
function showBooking() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('booking');
    }
    
    // Трекинг начала записи
    if (window.analyticsTracker) {
        window.analyticsTracker.trackBookingStarted();
    }
    
    showScreen('booking');
    
    // Установить минимальную дату как сегодня
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').setAttribute('min', today);
}

// Мастера
function showArtists() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('artists');
    }
    showScreen('artists');
    loadArtists();
}

function loadArtists() {
    const list = document.getElementById('artists-list');
    list.innerHTML = '';
    
    artistsData.forEach(artist => {
        const div = document.createElement('div');
        div.className = 'artist-card';
        div.innerHTML = `
            <div class="artist-card-header">
                <img src="${artist.photo}" alt="${artist.name}">
                <div>
                    <h3>${artist.name}</h3>
                    <p>Опыт: ${artist.experience}</p>
                </div>
            </div>
            <p>${artist.description}</p>
            <div class="artist-specialization">
                ${artist.specialization.map(spec => 
                    `<span class="specialization-tag">${spec}</span>`
                ).join('')}
            </div>
        `;
        list.appendChild(div);
    });
}

// Цены
function showPrices() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('prices');
    }
    showScreen('prices');
    // Автоматически рассчитываем при открытии
    setTimeout(calculatePrice, 100);
}

// Калькулятор стоимости
const priceCalculator = {
    basePrices: {
        small: 3000,      // до 50 см²
        medium: 5000,     // 50-150 см²
        large: 10000,     // от 150 см²
        portrait: 15000   // портрет
    }
};

function calculatePrice() {
    const size = document.getElementById('calc-size').value;
    const style = document.getElementById('calc-style');
    const styleMultiplier = parseFloat(style.options[style.selectedIndex].dataset.multiplier) || 1.0;
    
    const complexity = document.getElementById('calc-complexity');
    const complexityMultiplier = parseFloat(complexity.options[complexity.selectedIndex].dataset.multiplier) || 1.0;
    
    const color = document.getElementById('calc-color');
    const colorMultiplier = parseFloat(color.options[color.selectedIndex].dataset.multiplier) || 1.0;
    
    // Базовая цена
    let basePrice = priceCalculator.basePrices[size] || priceCalculator.basePrices.medium;
    
    // Для портрета - особый расчет
    if (size === 'portrait') {
        basePrice = priceCalculator.basePrices.portrait;
    }
    
    // Расчет с учетом множителей
    let finalPrice = basePrice * styleMultiplier * complexityMultiplier * colorMultiplier;
    
    // Округление до сотен
    finalPrice = Math.round(finalPrice / 100) * 100;
    
    // Минимальная цена
    if (finalPrice < 2000) {
        finalPrice = 2000;
    }
    
    // Обновляем отображение
    const priceElement = document.getElementById('calc-price');
    priceElement.textContent = finalPrice.toLocaleString('ru-RU') + ' ₽';
    
    // Анимация обновления
    priceElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        priceElement.style.transform = 'scale(1)';
    }, 200);
    
    // Трекинг использования калькулятора
    if (window.analyticsTracker) {
        window.analyticsTracker.trackEvent('calculator_used', {
            size: size,
            style: style.value,
            complexity: complexity.value,
            color: color.value,
            calculated_price: finalPrice
        });
    }
}

function resetCalculator() {
    document.getElementById('calc-size').value = 'medium';
    document.getElementById('calc-style').value = 'old_school';
    document.getElementById('calc-complexity').value = 'simple';
    document.getElementById('calc-color').value = 'bw';
    calculatePrice();
}

// Экспорт функций
window.calculatePrice = calculatePrice;
window.resetCalculator = resetCalculator;

// Контакты
function showContacts() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('contacts');
    }
    showScreen('contacts');
    // Генерируем QR-код при открытии
    generateQRCode();
}

// Генерация QR-кода для контактов
function generateQRCode() {
    const qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    
    // Контактная информация для QR-кода
    const contactData = {
        name: 'OnlyINK Тату-студия',
        tel: '+79383003320',
        address: 'г. Ставрополь, ул. Шпаковская, 97',
        url: 'https://t.me/OnlyINKQbot'
    };
    
    // Формируем vCard для QR-кода
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TEL:${contactData.tel.replace(/[\s()-]/g, '')}
ADR:;;${contactData.address};;;;
URL:${contactData.url}
END:VCARD`;
    
    // Используем API для генерации QR (без внешних библиотек)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vCard)}`;
    
    qrContainer.innerHTML = `<img src="${qrUrl}" alt="QR код контактов" style="max-width: 200px; width: 100%; border-radius: 8px; border: 2px solid rgba(102, 126, 234, 0.3);">`;
}

// Обработка формы обратной связи
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const message = document.getElementById('contact-message').value;
            
            // Формируем сообщение для Telegram
            const telegramMessage = `Новое сообщение из Mini App%0A%0A` +
                `Имя: ${encodeURIComponent(name)}%0A` +
                `Телефон: ${encodeURIComponent(phone)}%0A` +
                `Сообщение: ${encodeURIComponent(message)}`;
            
            // Открываем Telegram с сообщением
            const telegramUrl = `https://t.me/OnlyINKQbot?text=${telegramMessage}`;
            
            // Пытаемся открыть через Telegram WebApp API, если доступно
            if (window.telegramAPI && window.telegramAPI.tg) {
                window.telegramAPI.tg.openLink(telegramUrl);
            } else {
                // Или открываем в новой вкладке
                window.open(telegramUrl, '_blank');
            }
            
            // Показываем сообщение об успехе
            alert('Сообщение подготовлено! Откроется Telegram для отправки.');
            
            // Сброс формы
            contactForm.reset();
            
            // Трекинг отправки формы
            if (window.analyticsTracker) {
                window.analyticsTracker.trackEvent('contact_form_sent', {
                    name: name,
                    has_phone: !!phone
                });
            }
        });
    }
});

// О студии
function showAbout() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('about');
    }
    showScreen('about');
}

// Обработка формы записи
document.getElementById('booking-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        artist: document.getElementById('artist-select').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        description: document.getElementById('booking-description').value,
        client: window.telegramAPI?.user || null
    };
    
    // Трекинг завершения записи
    if (window.analyticsTracker) {
        window.analyticsTracker.trackBookingCompleted(data);
    }
    
    // Отправить данные
    if (window.telegramAPI?.sendBookingData) {
        window.telegramAPI.sendBookingData(data);
    }
    
    // Показать сообщение
    alert('Спасибо! Ваша заявка отправлена. Мастер свяжется с вами в ближайшее время.');
    
    // Вернуться на главную
    setTimeout(() => {
        showHome();
    }, 1500);
});

// Глобально экспортировать функции
window.showHome = showHome;
window.showPortfolio = showPortfolio;
window.showBooking = showBooking;
window.showArtists = showArtists;
window.showPrices = showPrices;
window.showContacts = showContacts;
window.showAbout = showAbout;

