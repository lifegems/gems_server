var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

function DBConnector() {
   var api = {
      select: select
   };

   function select() {
      mongo.connect(DB_URL, function(err, db) {
         db.collection('terms').find().toArray(function(err, docs) {
            console.log(docs);
            db.close();
         });
      });
   };

   return api;
}

var dbc = new DBConnector();

dbc.select();