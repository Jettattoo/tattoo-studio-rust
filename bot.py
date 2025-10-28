#!/usr/bin/env python3
"""
Telegram Bot для тату-студии
Простой и надежный бот без конфликтов
"""

import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# URL Mini App
MINI_APP_URL = "https://Jettattoo.github.io/tattoo-studio/"

# Токен бота
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
if not BOT_TOKEN:
    raise ValueError("TELEGRAM_BOT_TOKEN не найден в переменных окружения!")

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    logger.info(f"📥 Получена команда /start от: {user.first_name}")
    
    # Создаем клавиатуру с кнопкой Mini App
    keyboard = [
        [InlineKeyboardButton(
            "📱 Открыть студию", 
            web_app=WebAppInfo(url=MINI_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"🎨 Привет, {user.first_name}!\n\nДобро пожаловать в тату-студию!\n\nНажмите кнопку ниже, чтобы открыть наше приложение:"
    
    await update.message.reply_text(welcome_text, reply_markup=reply_markup)

async def studio_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /studio"""
    user = update.effective_user
    logger.info(f"📥 Получена команда /studio от: {user.first_name}")
    
    keyboard = [
        [InlineKeyboardButton(
            "📱 Открыть студию", 
            web_app=WebAppInfo(url=MINI_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text("🎨 Открываем студию...", reply_markup=reply_markup)

async def portfolio_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /portfolio"""
    user = update.effective_user
    logger.info(f"📥 Получена команда /portfolio от: {user.first_name}")
    
    keyboard = [
        [InlineKeyboardButton(
            "📸 Портфолио", 
            web_app=WebAppInfo(url=f"{MINI_APP_URL}#portfolio")
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text("📸 Портфолио наших работ", reply_markup=reply_markup)

async def booking_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /booking"""
    user = update.effective_user
    logger.info(f"📥 Получена команда /booking от: {user.first_name}")
    
    keyboard = [
        [InlineKeyboardButton(
            "📅 Записаться", 
            web_app=WebAppInfo(url=f"{MINI_APP_URL}#booking")
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text("📅 Записаться на сеанс", reply_markup=reply_markup)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    help_text = """
🤖 Команды бота:

/start - Запустить бота
/studio - Открыть студию
/portfolio - Портфолио работ
/booking - Записаться на сеанс
/help - Эта справка

📱 Все функции доступны через Mini App!
    """
    await update.message.reply_text(help_text)

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик обычных сообщений"""
    user = update.effective_user
    message_text = update.message.text
    
    logger.info(f"📥 Получено сообщение от {user.first_name}: {message_text}")
    
    # Простой ответ на неизвестные сообщения
    await update.message.reply_text(
        "🤖 Отправьте /start для начала работы с ботом или /help для справки."
    )

def main() -> None:
    """Основная функция запуска бота"""
    logger.info("🚀 Запуск бота...")
    logger.info(f"🔑 Токен: {'Есть' if BOT_TOKEN else 'НЕТ!'}")
    
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("studio", studio_command))
    application.add_handler(CommandHandler("portfolio", portfolio_command))
    application.add_handler(CommandHandler("booking", booking_command))
    application.add_handler(CommandHandler("help", help_command))
    
    # Добавляем обработчик обычных сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logger.info("🤖 Бот создан успешно!")
    logger.info("📱 URL Mini App:", MINI_APP_URL)
    
    # Запускаем бота
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
