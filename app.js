
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var movieList = require('./MoviesList');
var app = express();
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/tmt";
var url = "mongodb://tmt:tmt123@ds263660.mlab.com:63660/tmt";

// var dbConnect = function(){
//   MongoClient.connect(url, function(err, db) {
//     if (err) {throw err; console.log(err);};
//     db.close();
//     console.log('database connected');
//   });
// };
// dbConnect();

//============================================ App Settings ============================================
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
// =====================================================================================================

app.use('/images', express.static('images'));
app.use('/styles/icomoonFonts', express.static(path.join(__dirname,'/styles/fonts/')));
app.use('/pages', express.static(path.join(__dirname,'/views/pages')));
app.use('/scripts/', express.static(path.join(__dirname,'/scripts/')));
app.use('/fonts', express.static(path.join(__dirname,'/public/fonts/')));
app.use('/directives/', express.static(path.join(__dirname,'/scripts/directives/')));
app.use('/public', express.static(path.join(__dirname,'/public/')));

app.get('/', (req, res)=>{
  res.render('index',{movieList});
});

app.get('/getMovieList', (req, res)=>{
  let filterQuery = {};
  let sortQuery = {};
  if(req.query.sort && Object.keys(JSON.parse(req.query.sort)).length > 0){
    sortQuery = JSON.parse(req.query.sort);
    let key = Object.keys(sortQuery)[0];
    let parsed_value = parseInt(Object.values(sortQuery)[0]);
    sortQuery[key] = parsed_value;
  }
  sortQuery.movieName = 1;
  if(req.query.filter && Object.keys(JSON.parse(req.query.filter)).length > 0){
    filterQuery = JSON.parse(req.query.filter);
  }
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var tmt = db.db('tmt');
      tmt.collection("tamilMovies").find(filterQuery).sort(sortQuery).toArray (function(err, result) {
      if (err) {console.log(err); throw err;}
      res.send(result);
      db.close();
    });
  });
});

app.post('/insertMovie', (req, res)=>{
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

app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});