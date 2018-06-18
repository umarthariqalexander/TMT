
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var movieList = require('./MoviesList');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tmt";

var dbConnect = function(){
  MongoClient.connect(url, function(err, db) {
    if (err) {throw err; console.log(err);};
    db.close();
    console.log('database connected');
  });
};


var insertOne = function(request){
  
};

//============================================ App Settings ============================================
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
// =====================================================================================================

app.use('/images', express.static('images'));
//app.use('/styles/fonts', express.static(path.join(__dirname,'/dist/fonts/')));
app.use('/pages', express.static(path.join(__dirname,'/views/pages')));
app.use('/scripts', express.static(path.join(__dirname,'/scripts/')));
app.use('/fonts', express.static(path.join(__dirname,'/dist/fonts/')));
app.use('/directives/', express.static(path.join(__dirname,'/scripts/directives/')));
app.use('/dist', express.static(path.join(__dirname,'/dist/')));

app.get('/', (req, res)=>{
  res.render('index',{movieList});
});

app.get('/getMovieList', (req, res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var tmt = db.db('tmt');
      tmt.collection("tamilMovies").find({}).toArray (function(err, result) {
      if (err) {console.log(err); throw err;}
      res.send(result);
      db.close();
    });
  });
});

app.post('/insertMovie', (req, res)=>{
  console.log(req.body);
  // insertOne(req.body);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var tmt = db.db('tmt');
      tmt.collection("tamilMovies").insertOne(req.body, function(err, result) {
      if (err) {console.log(err); throw err;}
      res.send('1 document inserted');
      db.close();
    });
  });
});

app.delete('/deleteMovie', (req, res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) {res.send(err); throw err;}
    var tmt = db.db('tmt');
    var query = { urlId: req.body.url};
      tmt.collection("tamilMovies").deleteOne(query, function(err, result) {
      if (err) {res.send(err); throw err;}
      res.send(result);
      db.close();
    });
  });
});

app.listen(5000);
