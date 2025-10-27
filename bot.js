const TelegramBot = require('node-telegram-bot-api');

// Токен бота из переменных окружения (для Render) или локальный
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8272782280:AAGFCLqzJtQDhhpKxNxWJLR9fh1KWgnHBQg';

// Создаем экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

// URL вашего Mini App
const MINI_APP_URL = 'https://Jettattoo.github.io/tattoo-studio/';

// Установить команды бота
bot.setMyCommands([
    { command: 'start', description: 'Запустить бота' },
    { command: 'studio', description: 'Открыть студию' },
    { command: 'portfolio', description: 'Портфолио' },
    { command: 'booking', description: 'Записаться' }
]);

// Команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    bot.sendMessage(chatId, `🎨 Привет, ${firstName}! Добро пожаловать в тату-студию!`, {
        reply_markup: {
            keyboard: [
                [{ text: '📱 Открыть студию', web_app: { url: MINI_APP_URL } }]
            ],
            resize_keyboard: true
        }
    });
});

// Команда /studio - открыть студию
bot.onText(/\/studio/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🎨 Открываем студию...', {
        reply_markup: {
            keyboard: [
                [{ text: '📱 Открыть студию', web_app: { url: MINI_APP_URL } }]
            ],
            resize_keyboard: true
        }
    });
});

// Команда /portfolio
bot.onText(/\/portfolio/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '📸 Портфолио наших работ', {
        reply_markup: {
            inline_keyboard: [[
                { text: '📱 Открыть портфолио', web_app: { url: MINI_APP_URL + '#portfolio' } }
            ]]
        }
    });
});

// Команда /booking
bot.onText(/\/booking/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '📅 Записаться на сеанс', {
        reply_markup: {
            keyboard: [
                [{ text: '📱 Записаться', web_app: { url: MINI_APP_URL + '#booking' } }]
            ],
            resize_keyboard: true
        }
    });
});


// Обработчики callback-кнопок
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    switch(data) {
        case 'portfolio':
            bot.sendMessage(chatId, '📸 Портфолио наших работ:\n\nОткройте Mini App чтобы посмотреть все работы!', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '📱 Открыть портфолио', web_app: { url: MINI_APP_URL + '#portfolio' } }
                    ]]
                }
            });
            break;

        case 'booking':
            bot.sendMessage(chatId, '📅 Записаться на сеанс:\n\nОткройте Mini App для записи!', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '📱 Записаться сейчас', web_app: { url: MINI_APP_URL + '#booking' } }
                    ]]
                }
            });
            break;

        case 'artists':
            bot.sendMessage(chatId, '👨‍🎨 Наши мастера:\n\nПосмотрите информацию о мастерах в Mini App!', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '📱 Смотреть мастера', web_app: { url: MINI_APP_URL + '#artists' } }
                    ]]
                }
            });
            break;

        case 'prices':
            bot.sendMessage(chatId, '💰 Цены:\n\n• Маленькая татуировка: от 3 000 ₽\n• Средняя татуировка: от 5 000 ₽\n• Большая татуировка: от 10 000 ₽', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '📱 Полная информация', web_app: { url: MINI_APP_URL + '#prices' } }
                    ]]
                }
            });
            break;

        case 'contacts':
            bot.sendMessage(chatId, '📞 Контакты:\n\n📍 Адрес: Улица, дом\n☎️ Телефон: +7 (999) 123-45-67\n📱 Telegram: @your_studio', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '📱 Открыть контакты', web_app: { url: MINI_APP_URL + '#contacts' } }
                    ]]
                }
            });
            break;
    }

    // Ответить на callback, чтобы убрать загрузку
    bot.answerCallbackQuery(query.id);
});

// Обработчик неизвестных команд
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    if (!msg.text?.startsWith('/')) {
        bot.sendMessage(chatId, 'Отправьте /start для начала работы с ботом.');
    }
});

console.log('🤖 Бот запущен и работает!');
console.log('📱 URL Mini App:', MINI_APP_URL);

