use teloxide::{prelude::*, utils::command::BotCommands};
use std::env;

// Команды бота
#[derive(BotCommands, Clone)]
#[command(rename_rule = "lowercase", description = "Команды тату-студии:")]
enum Command {
    #[command(description = "Запустить бота")]
    Start,
    #[command(description = "Открыть студию")]
    Studio,
    #[command(description = "Портфолио работ")]
    Portfolio,
    #[command(description = "Записаться на сеанс")]
    Booking,
}

// URL Mini App
const MINI_APP_URL: &str = "https://Jettattoo.github.io/tattoo-studio/";

#[tokio::main]
async fn main() {
    // Инициализация логирования
    env_logger::init();
    log::info!("🚀 Запуск бота на Rust...");

    // Получение токена из переменных окружения
    let token = env::var("TELEGRAM_BOT_TOKEN")
        .expect("❌ TELEGRAM_BOT_TOKEN не найден в переменных окружения!");
    
    log::info!("🔑 Токен получен: {}", if token.len() > 10 { "Есть" } else { "НЕТ!" });

    // Создание бота
    let bot = Bot::new(&token);
    
    log::info!("🤖 Бот создан успешно!");

    // Запуск бота
    Command::repl(bot, answer).await;
}

// Обработчик команд
async fn answer(bot: Bot, msg: Message, cmd: Command) -> ResponseResult<()> {
    let chat_id = msg.chat.id;
    let user_name = msg.from()
        .and_then(|user| user.first_name.as_ref())
        .unwrap_or(&"Пользователь".to_string());

    match cmd {
        Command::Start => {
            log::info!("📥 Получена команда /start от: {}", user_name);
            
            let keyboard = teloxide::types::ReplyKeyboardMarkup::new(vec![
                vec![teloxide::types::KeyboardButton::new("📱 Открыть студию")
                    .web_app(teloxide::types::WebAppInfo::new(MINI_APP_URL))]
            ])
            .resize_keyboard(true);

            bot.send_message(chat_id, format!("🎨 Привет, {}! Добро пожаловать в тату-студию!", user_name))
                .reply_markup(keyboard)
                .await?;
        }
        
        Command::Studio => {
            log::info!("📥 Получена команда /studio от: {}", user_name);
            
            let keyboard = teloxide::types::ReplyKeyboardMarkup::new(vec![
                vec![teloxide::types::KeyboardButton::new("📱 Открыть студию")
                    .web_app(teloxide::types::WebAppInfo::new(MINI_APP_URL))]
            ])
            .resize_keyboard(true);

            bot.send_message(chat_id, "🎨 Открываем студию...")
                .reply_markup(keyboard)
                .await?;
        }
        
        Command::Portfolio => {
            log::info!("📥 Получена команда /portfolio от: {}", user_name);
            
            let keyboard = teloxide::types::InlineKeyboardMarkup::new(vec![
                vec![teloxide::types::InlineKeyboardButton::new("📱 Открыть портфолио")
                    .web_app(teloxide::types::WebAppInfo::new(&format!("{}#portfolio", MINI_APP_URL)))]
            ]);

            bot.send_message(chat_id, "📸 Портфолио наших работ")
                .reply_markup(keyboard)
                .await?;
        }
        
        Command::Booking => {
            log::info!("📥 Получена команда /booking от: {}", user_name);
            
            let keyboard = teloxide::types::ReplyKeyboardMarkup::new(vec![
                vec![teloxide::types::KeyboardButton::new("📱 Записаться")
                    .web_app(teloxide::types::WebAppInfo::new(&format!("{}#booking", MINI_APP_URL)))]
            ])
            .resize_keyboard(true);

            bot.send_message(chat_id, "📅 Записаться на сеанс")
                .reply_markup(keyboard)
                .await?;
        }
    }

    Ok(())
}
