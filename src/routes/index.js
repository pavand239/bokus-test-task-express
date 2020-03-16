import express from 'express';
import fetch from "node-fetch";

const router = express.Router();

// функция для загрузки данных 
const fetchData = async (req, res, next) => {
  let response = await fetch('http://z.bokus.ru/user.json');
  let data = await response.json();
  req.data = data;
  next();
};

// функция для рендеринга таблицы
const renderTable = (req, res) => {
  let { user, book } = req.data,
    users = Object.values(user),// преобразование объекта в массив для использования map
    books = Object.values(book);
  // для каждого объекта user создается свойтво - массив книг этого user  с помощью filter
  users.forEach(user => user.books = books.filter(book => book.uid === user.uid)); 
  console.log(users);
  res.render('index', 
              {
                title:'Bokus Test Task ExpressJS',
                users,
              });
};
/* GET home page. */
router.get('/', 
  fetchData,
  renderTable
);

export default router;
