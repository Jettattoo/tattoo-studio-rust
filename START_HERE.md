# 🚀 НАЧАЛЬНАЯ ИНСТРУКЦИЯ

## ✅ ВСЕ ГОТОВО! Что делать дальше:

### 📝 ШАГ 1: Создать папку css и js (если их еще нет)

```bash
# Если еще не созданы папки, создайте их:
mkdir css
mkdir js

# Убедитесь что файлы на месте:
ls css/
ls js/
```

### 📝 ШАГ 2: Загрузить на GitHub

```bash
# В папке проекта выполните:

# 1. Инициализация Git
git init

# 2. Добавить все файлы
git add .

# 3. Первый commit
git commit -m "Initial commit: Telegram Mini App for tattoo studio"

# 4. Переименовать ветку в main
git branch -M main

# 5. Подключить к GitHub (ЗАМЕНИТЕ VASH_AKKAUNT на ваш логин!)
git remote add origin https://github.com/VASH_AKKAUNT/tattoo-studio.git

# 6. Отправить на GitHub
git push -u origin main
```

**ВАЖНО:** Сначала нужно создать репозиторий на GitHub! См. инструкцию ниже ↓

---

## 🔧 Подробная инструкция:

### 1️⃣ Создать репозиторий на GitHub

1. Зайдите на https://github.com
2. Нажмите зеленую кнопку "New" (или кнопку "+" в правом верхнем углу)
3. Repository name: `tattoo-studio` (или любое другое имя)
4. Описание (опционально): "Telegram Mini App для тату-студии"
5. Выберите **Public** (нужно для бесплатного хостинга)
6. **НЕ ВКЛЮЧАЙТЕ**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
7. Нажмите зеленую кнопку **"Create repository"**

### 2️⃣ Скопируйте URL репозитория

GitHub покажет вам команды, скопируйте URL из команды `git remote add origin...`

Выглядит так:
```
https://github.com/VASH_AKKAUNT/tattoo-studio.git
```

### 3️⃣ В терминале выполните:

```bash
# Если еще не созданы папки
mkdir css js

# Переместите файлы в нужные папки (если они не там)
# У вас уже должно быть:
# - css/style.css
# - js/telegram.js
# - js/app.js

# Теперь загрузите на GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VASH_AKKAUNT/tattoo-studio.git
git push -u origin main
```

### 4️⃣ Включить GitHub Pages

1. Зайдите на страницу вашего репозитория на GitHub
2. Нажмите **Settings** (вкладка справа)
3. В левом меню найдите **Pages**
4. В разделе "Source" выберите:
   - Branch: `main`
   - Folder: `/ (root)`
5. Нажмите **Save**

Подождите 1-2 минуты...

### 5️⃣ Проверить URL

Ваш сайт будет доступен по адресу:
```
https://VASH_AKKAUNT.github.io/tattoo-studio/
```

Замените **VASH_AKKAUNT** на ваш логин GitHub!

### 6️⃣ Создать Telegram бота

1. Откройте Telegram
2. Найдите [@BotFather](https://t.me/BotFather)
3. Отправьте команду `/newbot`
4. Введите имя: `Моя тату-студия` (или любое)
5. Введите username: `my_tattoo_studio_bot` (должен заканчиваться на `_bot`)
6. **СОХРАНИТЕ ТОКЕН!** Выглядит так: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### 7️⃣ Настроить Mini App

1. В чате с BotFather отправьте команду: `/newapp`
2. Выберите вашего бота (отправьте его username)
3. Title: `Главная` (или любое название)
4. Short description: `Запись на тату` (опционально)
5. Photo: нажмите "Skip" (пропустить)
6. Photo (for preview): нажмите "Skip"
7. GIF для меню: нажмите "Skip"
8. Short name: просто нажмите /cancel (не нужно)
9. **КОГДА СПРОСИТ URL:**
   ```
   https://VASH_AKKAUNT.github.io/tattoo-studio/
   ```
   (Замените VASH_AKKAUNT на ваш логин!)

### 8️⃣ Проверить работу

1. Найдите своего бота в Telegram
2. Нажмите **Start** или **Открыть**
3. Нажмите на кнопку с вашим Mini App
4. Должно открыться ваше приложение!

---

## 🎉 ГОТОВО!

Теперь у вас есть:
- ✅ Работающее Mini App в Telegram
- ✅ Бесплатный хостинг на GitHub Pages
- ✅ HTTPS (безопасное соединение)
- ✅ Красивый дизайн
- ✅ Все функции для тату-студии

---

## 📱 Что можно добавить:

В файлах уже есть заготовки для:
- Портфолио (замените на свои фото)
- Мастера (добавьте своих)
- Контакты (измените на свои)
- Цены (настройте под себя)

Откройте файлы и замените данные!

---

## ❓ Проблемы?

Если что-то не работает:
1. Проверьте, что все файлы загружены на GitHub
2. Проверьте, что GitHub Pages включен в Settings
3. Убедитесь, что URL правильный в BotFather
4. Подождите 2-3 минуты после изменений

---

## 🎊 Удачи!

Ваша тату-студия теперь в Telegram!

