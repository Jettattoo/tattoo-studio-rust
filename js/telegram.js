// Telegram Web App API
let tg = null;
let user = null;

// Инициализация при загрузке
function initTelegram() {
    // Проверяем, что открыто в Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        tg = window.Telegram.WebApp;
        
        // Инициализация
        tg.ready();
        tg.expand(); // Раскрыть на весь экран
        
        // Получаем данные пользователя
        user = tg.initDataUnsafe?.user;
        
        console.log('Telegram Web App инициализирован');
        console.log('Пользователь:', user);
        
        // Настроить главную кнопку
        tg.MainButton.setText('📅 Записаться');
        tg.MainButton.show();
        
        // Обработчик клика на главную кнопку
        tg.MainButton.onClick(() => {
            showBooking();
        });
        
        // Показать приветствие
        updateGreeting();
        
        // Скрыть загрузку
        document.getElementById('loading').classList.add('hidden');
        
    } else {
        console.log('Не в Telegram, работаем в режиме просмотра');
        // Если не в Telegram, просто скрываем загрузку
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
        }, 1000);
    }
}

// Обновить приветствие
function updateGreeting() {
    if (user && user.first_name) {
        const greetingEl = document.getElementById('greeting');
        if (greetingEl) {
            greetingEl.textContent = `Привет, ${user.first_name}! 👋`;
        }
    }
}

// Отправить данные формы
function sendBookingData(data) {
    if (tg && tg.sendData) {
        // Отправить данные обратно в бота
        tg.sendData(JSON.stringify(data));
        
        // Показать уведомление
        tg.showAlert('Запись успешно отправлена! Мастер свяжется с вами в ближайшее время.');
    } else {
        // Если не в Telegram, показать alert
        alert('Запись отправлена! Данные: ' + JSON.stringify(data));
    }
}

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', initTelegram);

// Экспорт для использования в других файлах
window.telegramAPI = {
    tg,
    user,
    sendBookingData
};

