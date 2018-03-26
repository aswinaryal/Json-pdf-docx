import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import handlebars from 'express-handlebars';
import path from 'path';

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(3000, function () {
    console.log('App listening on port 3000!')
});
