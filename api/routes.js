var insight = require('./insight/insight.controller.js');
var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

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
      console.log(req.body);
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
      res.send({name: 'insight', description: 'insight articles'});
    }
  }
];
