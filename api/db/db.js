var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

function DBConnector() {
   var api = {
      select: select
   };

   function select() {
      return mongo.connect(DB_URL, function(err, db) {
         return db.collection('terms').find().toArray();
      }).then(function(items) {
         return items;
      });
   };

   return api;
}

var dbc = new DBConnector();

dbc.select().then(function(data) {
   console.log(data);
});