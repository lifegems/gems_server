var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";
var db     = require('../db/db.js');
var dbc    = new db();

module.exports = [
   {
      path: '/api/it',
      request: 'get',
      callback: function(req,res) {
         mongo.connect(DB_URL, function(err, db) {
            var search = {};
            if (req.query.search) {
               var searchTerm = RegExp(["(", req.query.search, ")+"].join(""), "gi");
               search = {
                  name: searchTerm
               };
            }
            dbc.select('articles', search, function(data) {
               res.send(data);
            });
         });
      }
   },
   {
      path: '/api/it/:term',
      request: 'get',
      callback: function(req,res) {
         var searchTerm = RegExp(["^", req.params.term, "$"].join(""), "i");
         var search = {
            name: searchTerm
         };
         dbc.select('articles', search, function(data) {
            res.send(data);
         });
      }
   }
];
