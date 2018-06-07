// var MongoClient = require('mongodb').MongoClient;
// //Create a database named "mydb":
// var url = "mongodb://tmt:tmt123@ds147450.mlab.com:47450/tamiltubemovies";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://tmt:tmt123@ds147450.mlab.com:47450/tamiltubemovies";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("tamiltubemovies");
  var query = { id: "iBnGsPqI5x8" };
  dbo.collection("tamilnewmovies").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});