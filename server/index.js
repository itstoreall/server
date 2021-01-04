const express = require('express'); // подключает либу
const bodyParser = require('body-parser');

const app = express(); // создает экземпляр сервера
const port = 3000; // указывает порт

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = ["Bobby", "Chris"]; // массив пользователей

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.get('/google', (req, res) => {
   res.send(`
   <h2>Google web site</h2>
   <p>lorem ipsum</p>`);
});

// ========== users ==========
app.get('/users', (req, res) => {
   // users.pop(); // удаляет пользователя из users

   res.json(users); // - ответь джейсоном с юзерами
});

app.post('/users', (req, res) => {
   users.push(req.body.name); // добавляет новые данные в мас users
   res.json(users); // - ответь джейсоном с юзерами
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
}); // включает сервер