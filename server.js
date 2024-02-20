// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Настройка для использования статических файлов (index.html)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Создаем транспорт для отправки электронной почты
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'A vokebila11@gmail.com', // Ваш адрес электронной почты
        pass: 'kxlioness11' // Ваш пароль от почты
    }
});

// Обработка POST запроса на отправку электронной почты
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    // Настройка параметров для отправки письма
    const mailOptions = {
        from: 'avokebila11@gmail.com', // Отправитель
        to: to, // Получатель
        subject: subject, // Тема письма
        text: text // Текст письма
    };

    // Отправка письма
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error occurred: ', error);
            res.status(500).send('Error occurred, email not sent.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
