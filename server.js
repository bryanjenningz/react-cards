var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var CARDS = path.join(__dirname, 'cards.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/cards', function(req, res) {
  fs.readFile(CARDS, function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/cards', function(req, res) {
  fs.readFile(CARDS, function(err, data) {
    var cards = JSON.parse(data);
    cards.push(req.body);
    fs.writeFile(CARDS, JSON.stringify(cards, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(cards);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
