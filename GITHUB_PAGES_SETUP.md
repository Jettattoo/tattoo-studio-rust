# 🎉 ФАЙЛЫ ЗАГРУЖЕНЫ НА GITHUB!

## ✅ ЧТО СДЕЛАНО:

- ✅ Все файлы загружены на GitHub
- ✅ Репозиторий: https://github.com/Jettattoo/tattoo-studio
- ✅ 13 файлов успешно загружено

---

## 📝 ШАГ 2: ВКЛЮЧИТЬ GITHUB PAGES

### Что нужно сделать:

1. **Откройте в браузере:**
   https://github.com/Jettattoo/tattoo-studio

2. **Нажмите на вкладку "Settings"** (в верхнем меню)

3. **В левом меню найдите и нажмите "Pages"**

4. **В разделе "Source" выберите:**
   - Branch: `main`
   - Folder: `/ (root)`

5. **Нажмите кнопку "Save"** (зеленую)

6. **Подождите 1-2 минуты**

7. **Ваш сайт будет доступен по адресу:**
   ```
   https://Jettattoo.github.io/tattoo-studio/
   ```

---

## 🤖 ШАГ 3: СОЗДАТЬ TELEGRAM БОТА

### 3.1. Создать бота

1. Откройте Telegram
2. Найдите **[@BotFather](https://t.me/BotFather)**
3. Отправьте команду: `/newbot`
4. Введите имя: `Моя тату-студия` (или любое)
5. Введите username: `jettattoo_studio_bot` (должен заканчиваться на `_bot`)
6. **СОХРАНИТЕ ТОКЕН!** Выглядит так: `123456789:ABCdefGHI...`

### 3.2. Добавить Mini App

1. В чате с BotFather отправьте: `/newapp`
2. Выберите вашего бота из списка
3. **Title:** `Главная`
4. **Description:** `Запись на тату`
5. **Photo:** нажмите `/skip` или отправьте фото
6. **Photo (preview):** `/skip`
7. **GIF:** `/skip`
8. **Short name:** отправьте `/cancel`
9. **КОГДА СПРОСИТ URL:** Вставьте:
   ```
   https://Jettattoo.github.io/tattoo-studio/
   ```

---

## ✨ ПРОВЕРИТЬ РАБОТУ

1. Найдите своего бота в Telegram
2. Нажмите **Start**
3. Нажмите на кнопку с вашим Mini App
4. Приложение должно открыться! 🎉

---

## 🎨 ЧТО МОЖНО ИЗМЕНИТЬ

### Портфолио (файл `js/app.js`):

Найдите строку `const portfolioData = [` и замените на свои работы:

```javascript
const portfolioData = [
    {
        id: 1,
        title: 'Ваша работа',
        image: 'СЮДА_URL_К_КАРТИНКЕ',
        style: 'Реализм',
        artist: 'Имя мастера',
        location: 'Рука'
    },
    // Добавьте еще работы...
];
```

### Мастера (файл `js/app.js`):

Найдите строку `const artistsData = [`:

```javascript
const artistsData = [
    {
        id: 1,
        name: 'Имя мастера',
        specialization: ['Реализм', 'Портреты'],
        experience: '8 лет',
        photo: 'URL_К_ФОТО',
        description: 'Описание'
    }
];
```

### Контакты (файл `index.html`):

Найдите раздел "Контакты" и измените:
- Адрес
- Телефон
- Telegram username
- Email

---

## 📱 ИЗМЕНИТЬ ЗАГРУЗКУ (если вы уже редактировали файлы)

Если вы внесли изменения в файлы и хотите обновить на GitHub:

```bash
git add .
git commit -m "Update content"
git push
```

Подождите 1-2 минуты, обновления появятся на сайте!

---

## 🎉 ГОТОВО!

Теперь у вас есть:
- ✅ Telegram Mini App
- ✅ Сайт на GitHub Pages
- ✅ HTTPS (безопасное соединение)
- ✅ Красивый дизайн
- ✅ Все функции работают

Удачи! 🚀

