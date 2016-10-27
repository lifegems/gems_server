var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";
var https = require('https');
var fs    = require('fs');

var db = require('./db/db.js');
var dbc = new db();

var _ = require('underscore');

// routes
var it_routes = require('./routes/it.routes.js');

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
      mongo.connect(DB_URL, function(err, db) {
        db.collection('terms').insertOne(req.body);
        db.close();
      });
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
      path: '/api/notes',
      request: 'post',
      callback: function(req, res) {
         mongo.connect(DB_URL, function(err, db) {
            db.collection('notes').insertOne(req.body);
            db.close();
         });
      }
   },
   {
      path: '/api/notes/:book/:chapter',
      request: 'get',
      callback: function(req,res) {
         mongo.connect(DB_URL, function(err, db) {
            db.collection('notes').find().toArray(function(err, docs) {
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

var all_routes = _.union(main_routes, it_routes);


module.exports = all_routes;