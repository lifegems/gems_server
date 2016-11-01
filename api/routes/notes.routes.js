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
         var search = {
            book: parseInt(req.params.book)
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
         var search = {
            book: parseInt(req.params.book),
            chapter: parseInt(req.params.chapter)
         };
         if (req.query.type) {
            search.type = req.query.type;
         }
         dbc.select('notes', search, function(data) {
            res.send(data);
         });
      }
   }
];
