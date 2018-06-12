
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
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var tmt = db.db('tmt');
    var requestObj = { 
      urlId: request.urlId,
      movieName: request.movieName, 
      actor: request.actor, 
      actress: request.actress, 
      rating: request.rating, 
      certificate: request.certificate };
      tmt.collection("tamilMovies").insertOne(requestObj, function(err, res) {
      if (err) {console.log(err); throw err;}
      console.log("1 document inserted");
      db.close();
    });
  });
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

app.post('/insert', (req, res)=>{
  console.log(req.body);
  insertOne(req.body);
  console.log('inserting the record .....');
  res.send('data inserting in progress');
});

app.listen(5000);
