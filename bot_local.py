#!/usr/bin/env python3
"""
Telegram Bot для тату-студии - ЛОКАЛЬНАЯ ВЕРСИЯ
Простой и надежный бот для тестирования
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

# URL Mini App (наш настоящий сайт)
MINI_APP_URL = "https://Jettattoo.github.io/tattoo-studio/"

# Токен бота (встроенный для тестирования)
BOT_TOKEN = "8359015059:AAHixZnt6QGSu1WBNW9pTO4dKO1-o2rmrMM"

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    user_name = user.first_name if user and user.first_name else "Пользователь"
    
    logger.info(f"📥 Получена команда /start от: {user_name}")
    
    # Создаем клавиатуру с кнопкой Mini App
    keyboard = [
        [InlineKeyboardButton(
            "📱 Открыть студию", 
            web_app=WebAppInfo(url=MINI_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = (
        f"🎨 Привет, {user_name}!\n\n"
        "Добро пожаловать в тату-студию!\n\n"
        "Это ЛОКАЛЬНАЯ версия бота для тестирования.\n\n"
        "Нажмите кнопку ниже, чтобы открыть наше приложение:"
    )
    
    await update.message.reply_text(welcome_text, reply_markup=reply_markup)

async def studio_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /studio"""
    user = update.effective_user
    user_name = user.first_name if user and user.first_name else "Пользователь"
    
    logger.info(f"📥 Получена команда /studio от: {user_name}")
    
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
    user_name = user.first_name if user and user.first_name else "Пользователь"
    
    logger.info(f"📥 Получена команда /portfolio от: {user_name}")
    
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
    user_name = user.first_name if user and user.first_name else "Пользователь"
    
    logger.info(f"📥 Получена команда /booking от: {user_name}")
    
    keyboard = [
        [InlineKeyboardButton(
            "📅 Записаться", 
            web_app=WebAppInfo(url=f"{MINI_APP_URL}#booking")
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text("📅 Записаться на сеанс", reply_markup=reply_markup)

async def test_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Тестовая команда для проверки работы"""
    user = update.effective_user
    user_name = user.first_name if user and user.first_name else "Пользователь"
    
    logger.info(f"📥 Получена команда /test от: {user_name}")
    
    test_text = (
        "🧪 ТЕСТОВАЯ КОМАНДА\n\n"
        f"👤 Пользователь: {user_name}\n"
        f"🆔 ID: {user.id}\n"
        f"💬 Chat ID: {update.effective_chat.id}\n"
        f"📱 Mini App URL: {MINI_APP_URL}\n\n"
        "✅ Бот работает локально!"
    )
    
    await update.message.reply_text(test_text)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    help_text = (
        "🤖 Команды бота (ЛОКАЛЬНАЯ ВЕРСИЯ):\n\n"
        "/start - Запустить бота\n"
        "/studio - Открыть студию\n"
        "/portfolio - Портфолио работ\n"
        "/booking - Записаться на сеанс\n"
        "/test - Тестовая команда\n"
        "/help - Эта справка\n\n"
        "📱 Все функции доступны через Mini App!\n"
        "🏠 Это локальная версия для тестирования."
    )
    await update.message.reply_text(help_text)

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик обычных сообщений"""
    user = update.effective_user
    message_text = update.message.text if update.message else "None"
    user_name = user.first_name if user and user.first_name else "Пользователь"
    
    logger.info(f"📥 Получено сообщение от {user_name}: {message_text}")
    
    await update.message.reply_text(
        "🤖 Отправьте /start для начала работы с ботом или /help для справки.\n\n"
        "🏠 Это локальная версия для тестирования."
    )

def main() -> None:
    """Основная функция запуска бота"""
    logger.info("🚀 Запуск ЛОКАЛЬНОГО бота...")
    logger.info(f"🔑 Токен: {'Есть' if BOT_TOKEN else 'НЕТ!'}")
    logger.info(f"📱 URL Mini App: {MINI_APP_URL}")
    
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("studio", studio_command))
    application.add_handler(CommandHandler("portfolio", portfolio_command))
    application.add_handler(CommandHandler("booking", booking_command))
    application.add_handler(CommandHandler("test", test_command))
    application.add_handler(CommandHandler("help", help_command))
    
    # Добавляем обработчик обычных сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    logger.info("🤖 Локальный бот создан успешно!")
    logger.info("📱 Нажмите Ctrl+C для остановки")
    
    try:
        # Запускаем бота
        application.run_polling()
    except KeyboardInterrupt:
        logger.info("🛑 Получен сигнал прерывания, завершаем работу...")
    except Exception as e:
        logger.error(f"❌ Ошибка: {e}")

if __name__ == '__main__':
    main()