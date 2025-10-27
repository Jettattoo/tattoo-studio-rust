# 🎯 Telegram Mini App + CRM: Полное руководство

## 📋 Содержание
1. Варианты CRM систем
2. Что нужно для Telegram Mini App
3. Архитектура решения
4. Пошаговая реализация

---

## 🏆 ВАРИАНТЫ CRM СИСТЕМ

### Вариант 1: Своя CRM (Кастомная разработка) ⭐ РЕКОМЕНДУЕТСЯ

#### Технологии:
```
Backend: Node.js + Express + MongoDB
Frontend: React в Telegram Mini App
Bot: node-telegram-bot-api
```

#### Плюсы:
- ✅ Полный контроль над функционалом
- ✅ Интеграция с Telegram нативно
- ✅ Бесплатно (без подписок)
- ✅ Масштабируемо
- ✅ Все данные свои

#### Минусы:
- ❌ Нужна разработка с нуля
- ❌ Техподдержка своими силами
- ❌ 3-4 недели разработки

#### Функционал CRM:

**Для клиентов:**
- Просмотр портфолио
- Запись через календарь
- История своих записей
- Сохранение понравившихся работ
- Чаты с мастерами

**Для админа/мастера:**
```javascript
// Пример функционала в Mini App
const AdminDashboard = {
  // Управление записями
  viewAppointments: () => {
    // Показать все записи
    // Фильтры: сегодня, завтра, все
    // Поиск по клиенту
  },
  
  // Управление мастерами
  manageArtists: () => {
    // Добавить/удалить мастера
    // Настроить расписание
    // Посмотреть статистику
  },
  
  // Управление портфолио
  managePortfolio: () => {
    // Загрузить новую работу
    // Удалить старую
    // Редактировать описание
  },
  
  // Управление клиентами
  manageClients: () => {
    // Просмотреть историю клиента
    // Добавить заметки
    // Программа лояльности
  },
  
  // Статистика
  viewStats: () => {
    // Выручка за месяц
    // Количество записей
    // Популярные мастера
    // Часы работы
  },
  
  // Настройки
  settings: () => {
    // Рабочие часы
    // Цены
    // Тексты уведомлений
  }
};
```

#### Стоимость: $2000-2500
#### Время: 3-4 недели

---

### Вариант 2: Интеграция с AmoCRM/Bitrix24

#### Плюсы:
- ✅ Готовая CRM система
- ✅ Много функций из коробки
- ✅ Поддержка и обновления
- ✅ Мобильные приложения

#### Минусы:
- ❌ Подписка: 1000-3000₽/месяц
- ❌ Не все функции подходят для тату-студии
- ❌ Нужна интеграция через API
- ❌ Перегруженность для малого бизнеса

#### Функционал:
```javascript
// Интеграция с AmoCRM API
const amoCRMIntegration = {
  createLead(clientData) {
    // Создать заявку в AmoCRM
    fetch('https://your-domain.amocrm.ru/api/v4/leads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        name: `Запись ${clientData.name}`,
        custom_fields_values: [{
          field_id: 12345,
          values: [{ value: clientData.date }]
        }]
      })
    });
  }
};
```

#### Стоимость: Подписка от 1000₽/месяц + интеграция $500-800
#### Время: 1-2 недели интеграции

---

### Вариант 3: Низко-кодовое решение (Airtable + Zapier)

#### Архитектура:
```
Telegram Bot → Airtable (CRM база) → Zapier (автоматизация)
```

#### Плюсы:
- ✅ Визуальный интерфейс (без кода)
- ✅ Готовые шаблоны
- ✅ Интеграция с Telegram через Zapier
- ✅ Мобильное приложение Airtable

#### Минусы:
- ❌ Ограниченный функционал
- ❌ Подписка: $20-50/месяц
- ❌ Зависимость от сервиса

#### Настройка:

**1. Airtable:**
```
Таблица "Клиенты" (имя, телефон, telegram_id)
Таблица "Записи" (клиент, дата, мастер, статус)
Таблица "Мастера" (имя, специализация, рейтинг)
Таблица "Работы" (фото, мастер, стиль, теги)
```

**2. Zapier:**
```
Приход сообщения в Telegram → 
Создать запись в Airtable →
Отправить уведомление мастеру
```

#### Стоимость: Airtable $20/мес + Zapier $20/мес = $40/месяц
#### Время: 3-5 дней настройки

---

### Вариант 4: Google Sheets как CRM (Минималистичный)

#### Архитектура:
```
Telegram Bot → Google Sheets (через Google Apps Script)
```

#### Плюсы:
- ✅ Бесплатно
- ✅ Просто понять
- ✅ Общий доступ
- ✅ Легко экспортировать данные

#### Минусы:
- ❌ Ограниченный функционал
- ❌ Не для масштабирования
- ❌ Нет UI для админа
- ❌ Ручная работа с данными

#### Структура:

**Google Sheet 1: Клиенты**
| ID | Имя | Телефон | Telegram ID | Первая запись | Всего записей |
|---|---|---|---|---|---|
| 1 | Иван | +7... | 123456 | 2024-01-15 | 3 |

**Google Sheet 2: Записи**
| ID | Клиент | Дата | Время | Мастер | Статус | Заметки |
|---|---|---|---|---|---|---|
| 1 | 1 | 2024-02-01 | 14:00 | Анна | ✅ Завершено | Роза на руке |

**Google Apps Script для автоматизации:**
```javascript
function sendTelegramNotification(chatId, message) {
  const botToken = 'YOUR_BOT_TOKEN';
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });
}
```

#### Стоимость: Бесплатно (для простых задач)
#### Время: 1 неделя

---

## 🎯 РЕКОМЕНДАЦИЯ

### Для малой студии (1-2 мастера):
**Google Sheets + Telegram Bot**
- Быстро запустить
- Бесплатно
- Достаточно функционала
- Стоимость: $500-700 на разработку бота

### Для средней студии (3-5 мастеров):
**Своя кастомная CRM** ⭐
- Полный контроль
- Подходит под специфику
- Без подписок
- Стоимость: $2000-2500

### Для большой студии (5+ мастеров):
**AmoCRM + кастомная разработка**
- Мощная CRM
- Интеграция с сайтом
- Отделы и роли
- Стоимость: подписка + разработка $1500

---

## 🤖 ЧТО НЕОБХОДИМО ДЛЯ TELEGRAM MINI APP

### 1. Технические требования

#### Telegram Bot:
```bash
# Создать бота через @BotFather
1. Написать @BotFather в Telegram
2. Команда /newbot
3. Указать имя и username
4. Получить токен
```

#### Домен и SSL:
```bash
# Нужен HTTPS обязательно!
# Варианты:
1. Vercel (бесплатно) - РЕКОМЕНДУЕТСЯ
2. Netlify (бесплатно)
3. Railway ($5/месяц)
4. Custom сервер (от $10/месяц)
```

#### База данных:
```bash
# Варианты:
1. MongoDB Atlas (бесплатный tier 512MB)
2. PostgreSQL на Railway ($5/месяц)
3. Supabase (бесплатный tier 500MB)
4. Cloud SQL (Google) - для больших проектов
```

---

### 2. Структура проекта

```
tattoo-studio-telegram/
├── bot/                    # Telegram Bot
│   ├── handlers/          # Обработчики команд
│   ├── services/          # Сервисы (notifications, scheduler)
│   └── bot.js             # Главный файл бота
│
├── mini-app/              # Frontend (Telegram Mini App)
│   ├── src/
│   │   ├── pages/         # Страницы приложения
│   │   ├── components/    # Компоненты
│   │   └── App.jsx        # Главный компонент
│   └── package.json
│
├── backend/               # API Backend
│   ├── routes/            # API маршруты
│   ├── models/            # Модели данных
│   ├── controllers/       # Контроллеры
│   └── server.js          # Express сервер
│
├── database/              # Миграции и схемы
│   └── schema.sql
│
└── deployment/            # Настройки деплоя
    ├── Dockerfile
    ├── docker-compose.yml
    └── vercel.json
```

---

### 3. Пакет технологий

#### package.json (Минимум):
```json
{
  "name": "tattoo-studio",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon server/index.js",
    "build": "cd mini-app && npm run build",
    "start": "node server/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-telegram-bot-api": "^0.64.0",
    "mongoose": "^7.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "axios": "^1.6.0",
    "node-cron": "^3.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

#### Backend структура (Node.js):
```javascript
// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Инициализация Telegram бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});

// API роуты
app.use('/api', require('./routes/api'));
app.use('/api/admin', require('./routes/admin'));

// Webhook для Telegram (если нужно)
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
```

---

### 4. Необходимые переменные окружения (.env)

```bash
# Telegram
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_BOT_USERNAME=your_studio_bot

# База данных
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/tattoo-studio
# или
DATABASE_URL=postgresql://user:password@host:5432/tattoo-studio

# Секретные ключи
JWT_SECRET=your-secret-key-here
ADMIN_TELEGRAM_ID=123456789

# Облачные сервисы (опционально)
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key

# Email/SMS уведомления (опционально)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# Frontend URL
FRONTEND_URL=https://your-miniapp.vercel.app
BACKEND_URL=https://your-api.railway.app
```

---

### 5. Модели данных (MongoDB/Mongoose)

```javascript
// models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  telegramId: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  username: String,
  phone: String,
  email: String,
  
  // История записей
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  
  // Избранные работы
  favoriteTattoos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tattoo'
  }],
  
  // Лояльность
  loyaltyPoints: {
    type: Number,
    default: 0
  },
  loyaltyLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  
  // Метаданные
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastAppointment: Date,
  totalSpent: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Client', ClientSchema);
```

```javascript
// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    default: 2 // часа
  },
  service: String, // описание татуировки
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  price: Number,
  notes: String,
  sketch: String, // ссылка на эскиз
  
  // Уведомления
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderDate: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Индекс для быстрого поиска свободных слотов
AppointmentSchema.index({ artist: 1, date: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);
```

```javascript
// models/Artist.js
const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  name: String,
  specialization: [String], // ['реализм', 'old_school', 'tribal']
  experience: Number, // лет
  rating: Number,
  photo: String,
  bio: String,
  telegramId: Number,
  
  // Расписание
  schedule: {
    monday: [{ start: String, end: String }],
    tuesday: [{ start: String, end: String }],
    // ... другие дни
  },
  
  // Портфолио
  portfolio: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tattoo'
  }],
  
  // Статистика
  totalAppointments: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Artist', ArtistSchema);
```

```javascript
// models/Tattoo.js (Портфолио)
const mongoose = require('mongoose');

const TattooSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String], // массив URL-ов
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  style: String, // 'реализм', 'old_school', etc.
  location: String, // 'рука', 'спина', etc.
  tags: [String],
  color: {
    type: String,
    enum: ['цветное', 'черное']
  },
  size: String,
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tattoo', TattooSchema);
```

---

### 6. API Endpoints (Базовые)

```javascript
// routes/api.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Appointment = require('../models/Appointment');
const Artist = require('../models/Artist');
const Tattoo = require('../models/Tattoo');

// Получить доступные слоты
router.get('/availability/:artistId/:date', async (req, res) => {
  const { artistId, date } = req.params;
  
  const appointments = await Appointment.find({
    artist: artistId,
    date: new Date(date)
  });
  
  // Логика получения свободных слотов
  const availableSlots = getAvailableSlots(appointments, artistId, date);
  
  res.json({ availableSlots });
});

// Создать запись
router.post('/appointments', async (req, res) => {
  const { clientId, artistId, date, service } = req.body;
  
  const appointment = new Appointment({
    client: clientId,
    artist: artistId,
    date: new Date(date),
    service,
    status: 'pending'
  });
  
  await appointment.save();
  
  // Отправить уведомление мастеру
  await sendNotificationToArtist(artistId, appointment);
  
  res.json({ success: true, appointment });
});

// Получить портфолио
router.get('/portfolio', async (req, res) => {
  const tattoos = await Tattoo.find()
    .populate('artist')
    .sort({ createdAt: -1 })
    .limit(20);
  
  res.json(tattoos);
});

module.exports = router;
```

---

### 7. Telegram Bot Handlers

```javascript
// bot/handlers/start.js
const Client = require('../models/Client');

module.exports = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const { first_name, last_name, username } = msg.from;
    
    // Проверить, есть ли клиент в БД
    let client = await Client.findOne({ telegramId: chatId });
    
    if (!client) {
      // Создать нового клиента
      client = new Client({
        telegramId: chatId,
        firstName: first_name,
        lastName: last_name,
        username: username
      });
      await client.save();
    }
    
    // Главное меню
    bot.sendMessage(chatId, `👋 Привет, ${first_name}! Добро пожаловать в студию!`, {
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: '📸 Портфолио', 
              web_app: { url: process.env.FRONTEND_URL + '/portfolio' } 
            }
          ],
          [
            { 
              text: '📅 Записаться', 
              web_app: { url: process.env.FRONTEND_URL + '/booking' } 
            }
          ],
          [
            { 
              text: '👨‍🎨 Наши мастера', 
              web_app: { url: process.env.FRONTEND_URL + '/artists' } 
            }
          ],
          [
            { text: '💰 Цены', callback_data: 'prices' },
            { text: '❓ Помощь', callback_data: 'help' }
          ]
        ]
      }
    });
  });
};
```

---

### 8. Telegram Mini App (Frontend - React)

```jsx
// mini-app/src/App.jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Проверка, что открыто в Telegram
    if (window.Telegram && window.Telegram.WebApp) {
      const tgInstance = window.Telegram.WebApp;
      tgInstance.ready();
      tgInstance.expand(); // Раскрыть на весь экран
      
      setTg(tgInstance);
      setUser(tgInstance.initDataUnsafe?.user);
      
      // Настроить главную кнопку
      tgInstance.MainButton.setText('Записаться');
      tgInstance.MainButton.onClick(() => {
        window.location.href = '/booking';
      });
      tgInstance.MainButton.show();
    }
  }, []);
  
  return (
    <div className="app">
      {user && (
        <div className="greeting">
          Привет, {user.first_name}! 👋
        </div>
      )}
      
      <div className="content">
        {/* Ваш контент здесь */}
      </div>
    </div>
  );
}

export default App;
```

---

## 📋 ЧЕКЛИСТ ПЕРЕД ЗАПУСКОМ

### Технические требования:
- [ ] Создан Telegram бот (@BotFather)
- [ ] Получен токен бота
- [ ] Настроен HTTPS (Vercel/Netlify)
- [ ] Подключена БД (MongoDB/PostgreSQL)
- [ ] Создан .env файл
- [ ] Настроены переменные окружения

### Backend:
- [ ] Express сервер запускается
- [ ] Подключение к БД работает
- [ ] API endpoints работают
- [ ] Тестовые запросы проходят

### Telegram Bot:
- [ ] Бот отвечает на /start
- [ ] Кнопки открывают Mini App
- [ ] Уведомления отправляются
- [ ] Webhook настроен (если нужно)

### Mini App (Frontend):
- [ ] Приложение открывается в Telegram
- [ ] Отображается контент
- [ ] API запросы работают
- [ ] Адаптивно для мобильных
- [ ] Главная кнопка работает

### CRM функционал:
- [ ] Клиенты создаются автоматически
- [ ] Записи сохраняются в БД
- [ ] Админ может видеть все записи
- [ ] Статистика отображается
- [ ] Уведомления о записях работают

---

## 💰 ИТОГОВАЯ СТОИМОСТЬ

| Элемент | Стоимость |
|---------|-----------|
| Разработка бота | $300 |
| Mini App Frontend | $600 |
| Backend + API | $500 |
| CRM функционал | $700 |
| База данных (настройка) | $200 |
| Тестирование | $200 |
| **ИТОГО** | **$2500** |

**Плюс:** Хостинг: ~$10-15/месяц (Vercel бесплатно + Railway $5 + MongoDB бесплатно)

---

## 🚀 БЫСТРЫЙ СТАРТ

### Шаг 1: Создать бота (5 минут)
```
1. Открыть @BotFather в Telegram
2. /newbot
3. Ввести имя: "My Tattoo Studio Bot"
4. Получить токен
```

### Шаг 2: Клонировать шаблон
```bash
git clone https://github.com/your-template/tattoo-studio.git
cd tattoo-studio
npm install
```

### Шаг 3: Настроить .env
```bash
cp .env.example .env
# Заполнить токены
```

### Шаг 4: Запустить
```bash
npm run dev
```

### Шаг 5: Деплой
```bash
# Frontend на Vercel
npm run build
vercel deploy

# Backend на Railway
railway init
railway up
```

---

Готово! Теперь у вас есть полное руководство по созданию Telegram Mini App с CRM системой! 🎉

