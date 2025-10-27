const TelegramBot = require('node-telegram-bot-api');

// Токен вашего бота (получите через @BotFather)
const TOKEN = '8272782280:AAGFCLqzJtQDhhpKxNxWJLR9fh1KWgnHBQg';

// Создаем экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

// URL вашего Mini App
const MINI_APP_URL = 'https://Jettattoo.github.io/tattoo-studio/';

// Установить главную кнопку для всех чатов
bot.setChatMenuButton({menu_button: {
    type: 'web_app',
    text: '🎨 Открыть студию',
    web_app: { url: MINI_APP_URL }
}});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    bot.sendMessage(chatId, `🎨 Привет, ${firstName}! Добро пожаловать в тату-студию!`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { 
                        text: '📱 Открыть студию', 
                        web_app: { url: MINI_APP_URL } 
                    }
                ],
                [
                    { text: '📸 Портфолио', callback_data: 'portfolio' },
                    { text: '📅 Записаться', callback_data: 'booking' }
                ],
                [
                    { text: '👨‍🎨 Мастера', callback_data: 'artists' },
                    { text: '💰 Цены', callback_data: 'prices' }
                ],
                [
                    { text: '📞 Контакты', callback_data: 'contacts' }
                ]
            ]
        }
    });
});

// Обработчик любого сообщения (если не /start)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    // Если не команда /start и есть текстовое сообщение
    if (msg.text && !msg.text.startsWith('/')) {
        bot.sendMessage(chatId, '👋 Нажмите на кнопку внизу экрана "🎨 Открыть студию" или отправьте /start для меню.', {
            reply_markup: {
                inline_keyboard: [[
                    { 
                        text: '📱 Открыть студию', 
                        web_app: { url: MINI_APP_URL } 
                    }
                ]]
            }
        });
    }
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

