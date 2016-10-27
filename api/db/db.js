var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

function DBConnector() {
   var api = {
      select: select
   };

   function select() {
      db.collection('terms').find(search).toArray(function(err, docs) {
         console.log(docs);
         db.close();
      });
   };

   return api;
}

var dbc = new DBConnector();

dbc.select();