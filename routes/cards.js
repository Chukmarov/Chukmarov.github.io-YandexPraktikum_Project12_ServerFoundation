const router = require('express').Router(); //вызываем метод Router

const cards = require('../data/cards.json');

router.get('/cards', (req,res) =>{
  res.send(cards);
});

module.exports = router; //экспорт роутера