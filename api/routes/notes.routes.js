var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";
var db     = require('../db/db.js');
var dbc    = new db();

module.exports = [
   {
      path: '/api/notes',
      request: 'post',
      callback: function(req,res) {
         dbc.insert('notes', req.body);
      }
   },
   {
      path: '/api/notes',
      request: 'get',
      callback: function(req,res) {
         dbc.select('notes', {}, function(data) {
            res.send(data);
         });
      }
   },
   {
      path: '/api/notes/:book',
      request: 'get',
      callback: function(req,res) {
         var searchTerm = RegExp(["^", req.params.book, "$"].join(""), "i");
         var search = {
            book: searchTerm
         };
         dbc.select('notes', search, function(data) {
            res.send(data);
         });
      }
   },
   {
      path: '/api/notes/:book/:chapter',
      request: 'get',
      callback: function(req,res) {
         var searchBook = RegExp(["^", +req.params.book, "$"].join(""), "i");
         var searchChapter = RegExp(["^", +req.params.chapter, "$"].join(""), "i");
         var search = {
            book: searchBook,
            chapter: searchChapter
         };
         if (req.query.type) {
            var searchType = RegExp(["^", +req.query.type, "$"].join(""), "i");
            search.type = searchType;
         }
         dbc.select('notes', search, function(data) {
            res.send(data);
         });
      }
   }
];