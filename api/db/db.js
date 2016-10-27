var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

module.exports = function DBConnector() {
   var api = {};

   function select(table, params) {
      params = (params) : params : {};
      return mongo.connect(DB_URL).then(function(err, db) {
         return db.collection(table).find(params).toArray();
      }).then(function(items) {
         return items;
      });
   }]

   return api;
}

var dbc = new DBConnector();

console.log(dbc.select('terms'));