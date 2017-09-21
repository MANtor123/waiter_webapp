'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiter";
mongoose.connection.on("error", function(err) {
  console.log("Mongo error : ");
  console.log(err);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

app.get('/waiterDays/:username', function(req, res) {
  var username = req.params.username

  res.render('index', {
      output: username

  })
})

app.post('/waiterDays/:username', function(res, req) {
  var username = req.params.username


  res.render('index', {
    output: output
  })
})



app.post('/scheduleDays', function(res, req) {

  res.render('workSch')
})


const port = process.env.PORT || 8000;
app.use(function(err, req, res, next) {
  res.status(500).send(err.stack);
})

app.listen(port, function() {
  console.log('Example app listening at :' + port)
});
