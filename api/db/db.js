var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

function DBConnector() {
   var api = {
      select: select
   };

   function select(cb) {
      mongo.connect(DB_URL, function(err, db) {
         db.collection('terms').find().toArray(function (err, items) {
            return cb(items);
         });
      });
   };

   return api;
}

var dbc = new DBConnector();

dbc.select(function(data) {
   console.log(data);
});