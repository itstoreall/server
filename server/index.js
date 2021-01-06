const express = require('express'); // подключает либу
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express(); // создает экземпляр сервера
const port = 3000; // указывает порт

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

// ========== todos ==========

let todos = [{
   id: 0,
   text: "fghjklkjhfdyui",
   done: false,
   timestamp: Date.now(),
}];

app.post('/todo', (req, res) => {
   const todo = req.body;
   const newTodo = {
      ...todo,
      id: todos.length, // TODO: change id to uuid
      timestamp: Date.now(),
   }

   todos.push(newTodo);

   res.status(201).json(newTodo);
});

// ----------------------------------- POST
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
}); // включает сервер


// ----------------------------------- GET todo
app.get('/todo', (req, res) => {
   res.json(todos);
});

// ----------------------------------- GET :id
app.get('/todo/:id', (req, res) => {
   const { id } = req.params;

   res.json(todos.find(todo => todo.id === Number(id)));
});

// ----------------------------------- DELETE :id
app.delete('/todo/:id', (req, res) => {
   const { id } = req.params;

   todos = todos.filter(todo => todo.id !== Number(id)); // все кроме этого id

   res.status(204).json({ message: 'done'});
});

// ----------------------------------- PATCH :id
app.patch('/todo/:id', (req, res) => {
   const { id } = req.params;
   const newTodoBody = req.body;

   todos = todos.map((todo) => todo.id === Number(id) ? {
      ...todo,
      ...newTodoBody,
   } : todo);

   const newTodo = todos.find(todo => todo.id === Number(id));

   res.json(newTodo);
});

// ----------------------------------- PUT :id
app.put('/todo/:id', (req, res) => {
   const { id } = req.params;
   const newTodoBody = req.body;

   todos = todos.map((todo) => todo.id === Number(id) ? newTodoBody : todo);

   res.json(todos.find(todo => todo.id === Number(id)));
})

/*

// ========== users ==========

const users = ["Bobby", "Chris"]; // массив пользователей

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.get('/google', (req, res) => {
   res.send(`
   <h2>Google web site</h2>
   <p>lorem ipsum</p>`);
});

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

*/