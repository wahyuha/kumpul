var express = require('express');
var router = express.Router();
var app = express();
var http = require('http');
// var engines = require('consolidate');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var port = process.env.PORT || 3000;

var httpServer = http.createServer(app);

// engine template
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// json
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.header('Content-type', 'text/html');
    res.sendFile(path.join(__dirname + '/build/index.html'));    
});

app.get('/users', function(req, res){
    res.header('Content-type', 'application/json');
    var obj = JSON.parse(fs.readFileSync('user.json', 'utf8'));    
    res.send(obj.users);
});

app.use('/build', express.static('build'))
app.use('/assets', express.static('assets'))

httpServer.listen(port);


