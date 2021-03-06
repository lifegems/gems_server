var https = require('https');
var fs    = require('fs');

var db = require('./db/db.js');
var dbc = new db();

var _ = require('underscore');

// routes
var it_routes = require('./routes/it.routes.js');
var notes_routes = require('./routes/notes.routes.js');

var main_routes = [
   {
      path: '/api/test',
      request: 'get',
      callback: function(req, res) {
         dbc.select(function(items) {
            res.send(items);
         });
      }
   },
   {
      path: '/api/terms',
      request: 'get',
      callback: function(req,res) {
         var search = {};
         if (req.query.search) {
            var searchTerm = RegExp(["(", req.query.search, ")+"].join(""), "gi");
            search = {
               name: searchTerm
            };
         }
         dbc.select('terms', search, function(data) {
            res.send(data);
         });
      }
  },
   {
      path: '/api/terms',
      request: 'post',
      callback: function(req,res) {
         dbc.insert('terms', req.body);
      }
   },
   {
      path: '/api/terms/:term',
      request: 'get',
      callback: function(req,res) {
         var searchTerm = RegExp(["^", req.params.term, "$"].join(""), "i");
         var search = {
            name: searchTerm
         };
         dbc.select('terms', search, function(data) {
            res.send(data);
         });
      }
   },
   {
      path: '/api/bible',
      request: 'get',
      callback: function(req,res) {
         var contents = fs.readFileSync('data/nwt/books.json');
         res.send(JSON.parse(contents));
      }
   },
   {
      path: '/api/bible/:book/:chapter',
      request: 'get',
      callback: function(req,res) {
         var file = 'data/nwt/books/' + req.params.book + '.' + req.params.chapter + '.json';
         var contents = fs.readFileSync(file);
         res.send(JSON.parse(contents));
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

var all_routes = main_routes.concat(it_routes).concat(notes_routes);

module.exports = all_routes;
