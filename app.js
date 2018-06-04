var express = require('express');
var bodyParser = require('body-parser');
var movieList = require('./MoviesList');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

app.use('/images', express.static('images'));

app.get('/', (req, res)=>{
  res.render('index',{movieList});
});

app.listen(3000);
