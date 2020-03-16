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
const renderTable = (req, res) => {
  let { user, book } = req.data;
  res.render('index', {user, book});
};
/* GET home page. */
router.get('/', 
  fetchData,
  renderTable
);

export default router;
