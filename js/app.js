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
}

// Контакты
function showContacts() {
    // Трекинг просмотра раздела
    if (window.analyticsTracker) {
        window.analyticsTracker.trackSectionViewed('contacts');
    }
    showScreen('contacts');
}

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

