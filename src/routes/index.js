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

/* GET home page. */
router.get('/', fetchData, (req, res, next) => {
  console.log(req.data);
  res.render('index', { title: 'My first express app' });
});

export default router;
