var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());

var URL = 'mongodb://localhost:4200/gems';
var routes = require('./api/routes.js');

routes.forEach(function(route) {

  if (route.request === 'get') {
    app.get(route.path, route.callback);
  }

  if (route.request === 'post') {
    app.post(route.path, route.callback);
  }

});

app.listen(443, function() {
  console.log("listening on port 443");
});

