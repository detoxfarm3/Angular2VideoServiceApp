var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var api = require('./server/routes/api');

var app = express();

// view engine setup
app.set(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(3000, function() {
    console.log('Running on 3000');
});

module.exports = app;
