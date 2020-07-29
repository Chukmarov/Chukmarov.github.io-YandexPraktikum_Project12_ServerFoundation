const router = require('express').Router(); //вызываем метод Router

const users = require('../data/users.json');

router.get('/users',(req,res) =>{
  res.send(users);
});

router.get('/users/:userid', (req,res) =>{
  const user = users.find(item => item._id == req.params.userid);
  if(Boolean(user)){
    res.send(user);
  }else{
    res.status(404).send({ "message": "Нет пользователя с таким id" });
  }
});

module.exports = router; //экспорт роутера