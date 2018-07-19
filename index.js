const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const PORT = 3000;

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/major', (req, res) => {
  res.render('major', { name: req.query.name });
});

app.get('/minor', (req, res) => {
  res.render('minor', { name: req.query.name });
});

app.post('/check', (req, res) => {
  const DATA_NASCIMENTO = req.body.userage;
  const age = moment().diff(moment(DATA_NASCIMENTO,
    'DD/MM/YYYY'), 'years');
  if (age < 18) {
    res.redirect(`/minor?name=${req.body.username}`);
  } else {
    res.redirect(`/major?name=${req.body.username}`);
  }
});

app.listen(PORT, () => console.log(`Server Rodando na Porta ${PORT}`));
