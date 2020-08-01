const fs = require('fs');
const path = require('path');
const router = require('express').Router(); //вызываем метод Router

const pathToUsers = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  const reader = fs.createReadStream(pathToUsers, {
    encoding: 'utf8'
  });

  reader.on('error', (err) => {
    res.status(500).send({
      Error: "Ошибка сервера"
    });
  });

  reader.on('open', () => {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    reader.pipe(res);
  });

});

router.get('/:userid', (req, res) => {

  const reader = fs.createReadStream(pathToUsers, {
    encoding: 'utf8'
  });
  let users = '';

  reader.on('error', (err) => {
    res.status(500).send({
      "message": "Ошибка сервера"
    });
  });

  reader.on('data', (data) => {
    users += data;
  });

  reader.on('end', () => {
    const userList = JSON.parse(users);
    res.set({
      'content-type': 'application/json; charset=utf-8'
    });
    const user = userList.find(item => item._id == req.params.userid);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        "message": "Нет пользователя с таким id"
      });
    }
  });

});

module.exports = router; //экспорт роутера