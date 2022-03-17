const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const newsController = require('./app/controllers/NewsController');
const route = require('./routes');
const db = require('./config/db');

const app = express();
const port = 3000;

//Parsed body cho form data, XMLHttp, Json, ...
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Path cố định; __dirname là thư mục gốc project
app.use(express.static(path.join(__dirname, 'public')));

//Dùng để đổi method (vì html chỉ hỗ trợ 2 method POST và GET - nhớ chú ý vị trí dòng này)
app.use(methodOverride('_method'));

//middlewares sort
app.use(SortMiddleware);

// Template engine
app.engine('.hbs', handlebars.engine({ 
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : "default";
            const icons = {
                default: "oi oi-elevator",
                asc: "oi oi-sort-ascending",
                desc: "oi oi-sort-descending",
            }
            const icon = icons[sortType];
            const types = {
                default: "desc",
                asc: "desc",
                desc: "asc"
            }
            const type = types[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
                        <span class="${icon}"></span>
                    </a>`;
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

//Connect DB
db.connect();

app.listen(port);
