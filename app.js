
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var movieList = require('./MoviesList');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

app.use('/images', express.static('images'));
//app.use('/styles/fonts', express.static(path.join(__dirname,'/dist/fonts/')));
app.use('/pages', express.static(path.join(__dirname,'/views/pages')));
app.use('/scripts', express.static(path.join(__dirname,'/scripts/')));
app.use('/fonts', express.static(path.join(__dirname,'/dist/fonts/')));
app.use('/directives/', express.static(path.join(__dirname,'/scripts/directives/')));
app.use('/dist', express.static(path.join(__dirname,'/dist/')));

// app.get('/', (req, res)=>{
//   res.render('index',{movieList});
// });
// app.get('/', (req, res) => {
//   res.sendfile('./views/multi_rfq.html');
// });
app.get('/', (req, res) => {
  res.sendfile('./views/itemized_rfq.html');
});

app.listen(5000);
