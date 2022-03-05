const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const newsController = require('./app/controllers/NewsController');
const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

//Parsed body cho form data, XMLHttp, Json, ...
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Path cố định
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('.hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

//Connect DB
db.connect();

app.listen(port);
