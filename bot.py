#!/usr/bin/env python3
"""
Telegram Bot для тату-студии
Простой и надежный бот без конфликтов
"""

import os
import logging
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from telegram.error import TelegramError

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

def create_mini_app_keyboard(text: str, url_suffix: str = "") -> InlineKeyboardMarkup:
    """Создает клавиатуру с кнопкой Mini App"""
    url = f"{MINI_APP_URL}{url_suffix}" if url_suffix else MINI_APP_URL
    keyboard = [
        [InlineKeyboardButton(text, web_app=WebAppInfo(url=url))]
    ]
    return InlineKeyboardMarkup(keyboard)

def get_user_name(user) -> str:
    """Безопасно получает имя пользователя"""
    if user and user.first_name:
        return user.first_name
    return "Пользователь"

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    try:
        user = update.effective_user
        user_name = get_user_name(user)
        logger.info(f"📥 Получена команда /start от: {user_name}")
        
        reply_markup = create_mini_app_keyboard("📱 Открыть студию")
        
        welcome_text = (
            f"🎨 Привет, {user_name}!\n\n"
            "Добро пожаловать в тату-студию!\n\n"
            "Нажмите кнопку ниже, чтобы открыть наше приложение:"
        )
        
        await update.message.reply_text(welcome_text, reply_markup=reply_markup)
        
    except TelegramError as e:
        logger.error(f"❌ Ошибка в start_command: {e}")
    except Exception as e:
        logger.error(f"❌ Неожиданная ошибка в start_command: {e}")

async def studio_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /studio"""
    try:
        user = update.effective_user
        user_name = get_user_name(user)
        logger.info(f"📥 Получена команда /studio от: {user_name}")
        
        reply_markup = create_mini_app_keyboard("📱 Открыть студию")
        await update.message.reply_text("🎨 Открываем студию...", reply_markup=reply_markup)
        
    except TelegramError as e:
        logger.error(f"❌ Ошибка в studio_command: {e}")
    except Exception as e:
        logger.error(f"❌ Неожиданная ошибка в studio_command: {e}")

async def portfolio_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /portfolio"""
    try:
        user = update.effective_user
        user_name = get_user_name(user)
        logger.info(f"📥 Получена команда /portfolio от: {user_name}")
        
        reply_markup = create_mini_app_keyboard("📸 Портфолио", "#portfolio")
        await update.message.reply_text("📸 Портфолио наших работ", reply_markup=reply_markup)
        
    except TelegramError as e:
        logger.error(f"❌ Ошибка в portfolio_command: {e}")
    except Exception as e:
        logger.error(f"❌ Неожиданная ошибка в portfolio_command: {e}")

async def booking_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /booking"""
    try:
        user = update.effective_user
        user_name = get_user_name(user)
        logger.info(f"📥 Получена команда /booking от: {user_name}")
        
        reply_markup = create_mini_app_keyboard("📅 Записаться", "#booking")
        await update.message.reply_text("📅 Записаться на сеанс", reply_markup=reply_markup)
        
    except TelegramError as e:
        logger.error(f"❌ Ошибка в booking_command: {e}")
    except Exception as e:
        logger.error(f"❌ Неожиданная ошибка в booking_command: {e}")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    try:
        help_text = (
            "🤖 Команды бота:\n\n"
            "/start - Запустить бота\n"
            "/studio - Открыть студию\n"
            "/portfolio - Портфолио работ\n"
            "/booking - Записаться на сеанс\n"
            "/help - Эта справка\n\n"
            "📱 Все функции доступны через Mini App!"
        )
        await update.message.reply_text(help_text)
        
    except TelegramError as e:
        logger.error(f"❌ Ошибка в help_command: {e}")
    except Exception as e:
        logger.error(f"❌ Неожиданная ошибка в help_command: {e}")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик обычных сообщений"""
    try:
        user = update.effective_user
        message_text = update.message.text if update.message else "None"
        user_name = get_user_name(user)
        
        logger.info(f"📥 Получено сообщение от {user_name}: {message_text}")
        
        await update.message.reply_text(
            "🤖 Отправьте /start для начала работы с ботом или /help для справки."
        )
        
    except TelegramError as e:
        logger.error(f"❌ Ошибка в handle_message: {e}")
    except Exception as e:
        logger.error(f"❌ Неожиданная ошибка в handle_message: {e}")

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик ошибок"""
    logger.error(f"❌ Ошибка при обработке обновления: {context.error}")

def main() -> None:
    """Основная функция запуска бота"""
    logger.info("🚀 Запуск бота...")
    logger.info(f"🔑 Токен: {'Есть' if BOT_TOKEN else 'НЕТ!'}")
    logger.info(f"📱 URL Mini App: {MINI_APP_URL}")
    
    try:
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
        
        # Добавляем обработчик ошибок
        application.add_error_handler(error_handler)
        
        logger.info("🤖 Бот создан успешно!")
        
        # Запускаем бота
        application.run_polling(
            allowed_updates=Update.ALL_TYPES,
            drop_pending_updates=True
        )
        
    except KeyboardInterrupt:
        logger.info("🛑 Получен сигнал прерывания, завершаем работу...")
    except Exception as e:
        logger.error(f"❌ Критическая ошибка: {e}")
        raise

if __name__ == '__main__':
    main()