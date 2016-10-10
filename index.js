var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://localhost:4200/gems';

app.get('/api', function(req, res) {
  MongoClient.connect(URL, function(err, db) {
    var collection = db.collection('terms');
    collection.find().toArray(function(err, docs) {
      res.send(docs);
      db.close();
    });
  });
});

app.listen(443, function() {
  console.log("listening on port 443");
});

/*
MongoClient.connect(URL, function(err, db) {
  if (err) return;

  var collection = db.collection('terms');
  collection.insert({name: 'taco', description: 'tasty food'}, function(err, result) {
    collection.find({name: 'taco'}).toArray(function(err, docs) {
      console.log(docs[0]);
      db.close();
    });
  });
});
*/

/*
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello world');
});

app.listen(443, function() {
  console.log('App listening on port 443');
});
*/
