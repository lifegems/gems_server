var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');
var fs         = require('fs');
var https      = require('https');
var http       = require('http');

var KEY_FILE = './certs/gems-key.pem';
var CRT_FILE = './certs/gems-cert.pem';

// Key and Client
var key  = (fs.exists(KEY_FILE)) ? fs.readFileSync(KEY_FILE) : null;
var cert = (fs.exists(CRT_FILE)) ? fs.readFileSync(CRT_FILE) : null;

// setup server options
var https_opts = {
  key: key,
  cert: cert
};
var app = express();
app.use(cors());
app.use(bodyParser.json());

// Gather all routes
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

// Initiate server
// if (key && cert) {
   var httpsServer = https.createServer(https_opts, app);
   httpsServer.listen(443, function() {
     console.log("Listening to https://localhost:443");
   });
// } else {
//    var httpServer = http.createServer(app);
//    httpServer.listen(443, function() {
//       console.log("Listening to http://localhost:443");
//    });
// }

