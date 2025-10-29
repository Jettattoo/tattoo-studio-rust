/**
 * Трекер событий для Mini App
 */

// Конфигурация
const TRACKER_ENABLED = true;
const TRACKER_API_URL = '/api/track'; // Будет настроен через прокси или напрямую

// Кэш событий для офлайн-режима
let eventQueue = [];
const MAX_QUEUE_SIZE = 50;

/**
 * Отследить событие
 */
function trackEvent(eventType, eventData = {}) {
    if (!TRACKER_ENABLED) {
        console.log('Трекер отключен:', eventType, eventData);
        return;
    }

    try {
        // Получаем данные пользователя из Telegram API
        const user = window.telegramAPI?.user;
        const telegram_id = user?.id;

        if (!telegram_id) {
            console.warn('Не удалось получить telegram_id для трекинга');
            return;
        }

        const payload = {
            telegram_id: telegram_id,
            event_type: eventType,
            event_data: {
                ...eventData,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                url: window.location.href
            }
        };

        // Отправляем событие
        sendEvent(payload);
    } catch (error) {
        console.error('Ошибка трекинга события:', error);
        // Сохраняем в очередь для повторной отправки
        eventQueue.push({ eventType, eventData });
    }
}

/**
 * Отправить событие на сервер
 */
function sendEvent(payload) {
    // Если есть API endpoint, отправляем туда
    if (TRACKER_API_URL && TRACKER_API_URL !== '/api/track') {
        fetch(TRACKER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            keepalive: true // Важно для отправки перед закрытием страницы
        }).catch(error => {
            console.error('Ошибка отправки события:', error);
            // Сохраняем в очередь
            eventQueue.push(payload);
        });
    } else {
        // Если API не настроен, отправляем через Telegram WebApp API
        try {
            if (window.telegramAPI?.tg?.sendData) {
                // Отправляем как строку через sendData
                window.telegramAPI.tg.sendData(JSON.stringify({
                    type: 'analytics_event',
                    ...payload
                }));
            }
            // Также сохраняем в localStorage для последующей синхронизации
            saveEventToLocalStorage(payload);
        } catch (error) {
            console.error('Ошибка отправки через Telegram API:', error);
            saveEventToLocalStorage(payload);
        }
    }
}

/**
 * Сохранить событие в localStorage для последующей отправки
 */
function saveEventToLocalStorage(payload) {
    try {
        const stored = localStorage.getItem('analytics_events');
        const events = stored ? JSON.parse(stored) : [];
        events.push(payload);
        
        // Ограничиваем размер очереди
        if (events.length > MAX_QUEUE_SIZE) {
            events.shift(); // Удаляем старые события
        }
        
        localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
        console.error('Ошибка сохранения события в localStorage:', error);
    }
}

/**
 * Отправить накопленные события из localStorage
 */
function flushEventQueue() {
    try {
        const stored = localStorage.getItem('analytics_events');
        if (!stored) return;

        const events = JSON.parse(stored);
        if (events.length === 0) return;

        // Отправляем все события
        events.forEach(event => {
            sendEvent(event);
        });

        // Очищаем очередь
        localStorage.removeItem('analytics_events');
    } catch (error) {
        console.error('Ошибка отправки очереди событий:', error);
    }
}

/**
 * Трекинг открытия Mini App
 */
function trackMiniAppOpened() {
    trackEvent('miniapp_opened', {
        source: 'telegram_bot',
        platform: 'web'
    });
}

/**
 * Трекинг просмотра раздела
 */
function trackSectionViewed(section, additionalData = {}) {
    trackEvent('section_viewed', {
        section: section,
        ...additionalData
    });
}

/**
 * Трекинг начала записи
 */
function trackBookingStarted() {
    trackEvent('booking_started', {
        timestamp: new Date().toISOString()
    });
}

/**
 * Трекинг завершения записи
 */
function trackBookingCompleted(bookingData) {
    trackEvent('booking_completed', {
        booking_data: bookingData,
        timestamp: new Date().toISOString()
    });
}

/**
 * Трекинг взаимодействия с контентом
 */
function trackContentInteraction(contentType, contentId = null) {
    trackEvent('content_interaction', {
        content_type: contentType,
        content_id: contentId
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Отслеживаем открытие Mini App
    if (window.telegramAPI?.user) {
        trackMiniAppOpened();
    }

    // Пытаемся отправить накопленные события
    flushEventQueue();

    // Отправляем накопленные события при закрытии
    window.addEventListener('beforeunload', function() {
        flushEventQueue();
    });
});

// Экспорт функций для использования в других файлах
window.analyticsTracker = {
    trackEvent,
    trackSectionViewed,
    trackBookingStarted,
    trackBookingCompleted,
    trackContentInteraction,
    flushEventQueue
};

