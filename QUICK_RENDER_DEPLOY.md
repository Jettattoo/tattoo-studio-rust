# ⚡ МОМЕНТАЛЬНЫЙ ДЕПЛОЙ НА RENDER

## 📝 Что сделать (займет 5 минут):

### ✅ ШАГ 1: Зарегистрироваться
1. Откройте https://render.com
2. **"Sign up with GitHub"** (кнопка синяя)
3. Разрешите доступ

### ✅ ШАГ 2: Создать сервис
1. Нажмите **"New +"** (справа сверху)
2. Выберите **"Web Service"**

### ✅ ШАГ 3: Подключить GitHub
1. Нажмите **"Connect a repository"**
2. Выберите: **tattoo-studio** 
3. Нажмите **"Connect"**

### ✅ ШАГ 4: Настроить (скопировать-вставить)

Скопируйте эти настройки:

**Name:**
```
tattoo-studio-bot
```

**Environment:**
```
Node
```

**Region:**
```
Frankfurt (EU)
```

**Branch:**
```
main
```

**Root Directory:**
```
(пусто, оставить)
```

**Build Command:**
```
npm install
```

**Start Command:**
```
node bot.js
```

**Plan:**
```
Free (можно потом на платный)
```

### ✅ ШАГ 5: Переменные окружения

1. Нажмите **"Advanced"**
2. В разделе "Environment" добавьте:

**Key:**
```
TELEGRAM_BOT_TOKEN
```

**Value:**
```
8272782280:AAGFCLqzJtQDhhpKxNxWJLR9fh1KWgnHBQg
```

3. Нажмите **"Add"**

### ✅ ШАГ 6: Запустить!

1. Нажмите **"Create Web Service"**
2. Подождите 2-3 минуты
3. Увидите: "✅ Live"

**ГОТОВО!** Бот работает 24/7! 🎉

---

## 🎯 Проверить работу

1. Откройте Telegram
2. Найдите бота
3. Отправьте `/start`
4. Нажмите кнопку "📱 Открыть студию"

**Должна открыться Mini App!**

---

## 📊 Где смотреть логи

1. Откройте https://dashboard.render.com
2. Найдите `tattoo-studio-bot`
3. Нажмите на него
4. Вкладка **"Logs"**

Должно быть:
```
🤖 Бот запущен и работает!
📱 URL Mini App: https://Jettattoo.github.io/tattoo-studio/
```

---

## ⚡ Все готово к деплою!

Просто откройте Render и выполните 6 шагов выше. 

**Удачи!** 🚀

