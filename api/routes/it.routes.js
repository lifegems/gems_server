module.export = [
  {
   path: '/api/it',
   request: 'get',
   callback: function(req,res) {
      mongo.connect(DB_URL, function(err, db) {
         var search = {};
         if (req.query.search) {
            var searchTerm = RegExp(["(", req.query.search, ")+"].join(""), "gi");
            search = {
               name: searchTerm
            };
         }
         dbc.select('articles', search, function(data) {
            res.send(data);
         });
       });
      }
   },
   {
      path: '/api/it/:term',
      request: 'get',
      callback: function(req,res) {
         var searchTerm = RegExp(["^", req.params.term, "$"].join(""), "i");
         var search = {
            name: searchTerm
         };
         dbc.select('articles', search, function(data) {
            res.send(data);
         });
      }
   }
];