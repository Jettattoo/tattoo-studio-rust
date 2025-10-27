# 🚀 Инструкция по деплою на GitHub

## ✅ ВСЕ ГОТОВО! Осталось 3 шага:

---

## 📝 ШАГ 1: Настроить Git (ТОЛЬКО ПЕРВЫЙ РАЗ)

Откройте командную строку в этой папке и выполните:

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

Замените на ваши данные!

---

## 📝 ШАГ 2: Создать репозиторий на GitHub

1. Откройте **https://github.com** в браузере
2. Нажмите кнопку **"+"** в правом верхнем углу
3. Выберите **"New repository"**
4. Заполните:
   - **Repository name:** `tattoo-studio` (или любое другое имя)
   - **Description:** (опционально) "Telegram Mini App for tattoo studio"
   - ✅ Выберите **Public** (нужно для бесплатного хостинга!)
   - ❌ НЕ ВКЛЮЧАЙТЕ: Add a README, .gitignore, license
5. Нажмите зеленую кнопку **"Create repository"**

---

## 📝 ШАГ 3: Загрузить файлы

После создания репозитория GitHub покажет вам URL. Скопируйте его!

Выполните в командной строке (в папке проекта):

```bash
# 1. Сделать первый commit (с информацией о вас)
git commit -m "Initial commit: Telegram Mini App for tattoo studio"

# 2. Переименовать ветку в main (современный стандарт)
git branch -M main

# 3. Подключить ваш GitHub репозиторий
git remote add origin https://github.com/VASH_LOGIN/tattoo-studio.git

# ⚠️ ВАЖНО: Замените VASH_LOGIN на ваш реальный логин GitHub!

# 4. Отправить файлы на GitHub
git push -u origin main
```

GitHub попросит авторизоваться - введите свой логин и пароль.

---

## 🎉 ГОТОВО!

Теперь ваш сайт будет доступен через 1-2 минуты по адресу:
```
https://VASH_LOGIN.github.io/tattoo-studio/
```

---

## 📱 ШАГ 4: Настроить Telegram Bot

### 4.1. Создать бота

1. Откройте Telegram
2. Найдите **[@BotFather](https://t.me/BotFather)**
3. Отправьте: `/newbot`
4. Введите имя: `Моя тату-студия` (или любое)
5. Введите username: `my_tattoo_studio_bot` (должен заканчиваться на `_bot`)
6. **СОХРАНИТЕ ТОКЕН!** Выглядит как: `123456789:ABCdefGHI...`

### 4.2. Добавить Mini App

1. В чате с BotFather отправьте: `/newapp`
2. Выберите вашего бота
3. **Title:** `Главная` (или любое название)
4. **Description:** (опционально) `Запись на тату`
5. **Photo:** Skip (пропустить)
6. **Photo (preview):** Skip
7. **GIF:** Skip
8. **Short name:** `/cancel` (не нужно)
9. **КОГДА СПРОСИТ URL:** Вставьте адрес вашего сайта:
   ```
   https://VASH_LOGIN.github.io/tattoo-studio/
   ```

---

## ✨ Проверить работу

1. Найдите своего бота в Telegram
2. Нажмите **Start**
3. Нажмите на кнопку с вашим Mini App
4. Приложение должно открыться!

---

## 🎨 Настройка под себя

После того как все заработает, можете изменить данные:

### Портфолио (`js/app.js`):
```javascript
const portfolioData = [
    {
        title: 'Ваша работа',
        image: 'URL_К_КАРТИНКЕ',
        style: 'Реализм',
        artist: 'Имя мастера',
        location: 'Рука'
    }
];
```

### Мастера (`js/app.js`):
```javascript
const artistsData = [
    {
        name: 'Имя мастера',
        specialization: ['Реализм', 'Портреты'],
        experience: '8 лет',
        photo: 'URL_К_ФОТО',
        description: 'Описание'
    }
];
```

### Контакты (`index.html`):
Найдите раздел с контактами и замените на свои!

---

## ❓ Проблемы?

**"Authentication failed":**
- Убедитесь, что используете правильный URL
- Используйте GitHub Personal Access Token вместо пароля

**"Repository not found":**
- Проверьте, что репозиторий существует на GitHub
- Убедитесь, что используете Public репозиторий

**Не открывается в Telegram:**
- Подождите 2-3 минуты после загрузки
- Проверьте, что GitHub Pages включен в Settings
- Убедитесь, что URL правильный в BotFather

---

## 📞 Нужна помощь?

Все команды выше нужно выполнить **последовательно** в командной строке в папке проекта!

Удачи! 🚀

