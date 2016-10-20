var insight = require('./insight/insight.controller.js');
var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";
var https = require('https');
var fs    = require('fs');

module.exports = [
 {
    path: '/api/terms',
    request: 'get',
    callback: function(req,res) {

     mongo.connect(DB_URL, function(err, db) {
        db.collection('terms').find().toArray(function(err, docs) {
          res.send(docs);
          db.close();
        });
      });
    }
  },
  {
    path: '/api/terms',
    request: 'post',
    callback: function(req,res) {
      mongo.connect(DB_URL, function(err, db) {
        db.collection('terms').insertOne(req.body);
        db.close();
      });
    }
  },
  {
    path: '/api/it',
    request: 'get',
    callback: function(req,res) {
      mongo.connect(DB_URL, function(err, db) {
        db.collection('articles').find().toArray(function(err, docs) {
          res.send(docs);
          db.close();
        });
      });
    }
  },
  {
    path: '/api/bible',
    request: 'get',
    callback: function(req,res) {
      var contents = fs.readFileSync('../data/nwt/books.json');
      res.send(contents);
    }
  },
  {
    path: '/api/bible/:book/:chapter',
    request: 'get',
    callback: function(req,res) {
      var contents = fs.readFileSync('data/nwt/books.json');
      res.send(contents);
    }
  },
  {
    path: '/api/bible/jw/',
    request: 'get',
    callback: function(req,res) {
      https.get('https://www.jw.org/en/publications/bible/nwt/books/json/html/', function(response) {
        var data = "";
        response.on('data', function(chunk) {
          data += chunk;
        });
        response.on('end', function() {
          res.send(data);
        });
      });
    }
  },
  {
    path: '/api/bible/jw/:range',
    request: 'get',
    callback: function(req,res) {
      var url = 'https://www.jw.org/en/publications/bible/nwt/books/json/html/' + req.params.range;
      https.get(url, function(response) {
        var data = "";
        response.on('data', function(chunk) {
          data += chunk;
        });
        response.on('end', function() {
          res.send(data);
        });
      });
    }
 }
];
