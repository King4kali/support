const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

// Замените на ваш токен бота
const BOT_TOKEN = 'your_bot_token_here';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Генерация случайной строки для ссылки
function generateRandomString(length = 10) {
    return randomstring.generate(length);
}

// Обработчик команды /getlink
bot.onText(/\/getlink/, (msg) => {
    const chatId = msg.chat.id;
    const link = generateRandomString();
    bot.sendMessage(chatId, `Ваша ссылка для доступа к сайту: https://yourdomain.com/${link}`);
});

// Создание и запуск сервера Express
const app = express();
app.use(bodyParser.json());

// Обработчик POST запроса для получения ссылки
app.post('/get-access-link', (req, res) => {
    const chatId = req.body.chatId; // Получаем chatId пользователя
    bot.sendMessage(chatId, '/getlink'); // Отправляем команду боту
    res.status(200).send('Запрос отправлен');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
