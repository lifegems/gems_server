var mongo = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:4200/gems";

module.exports = function DBConnector() {
   var api = {
      select: select
   };

   function select(cb) {
      mongo.connect(DB_URL, function(err, db) {
         db.collection('terms').find().toArray(function (err, items) {
            db.close();
            return cb(items);
         });
      });
   };

   return api;
}