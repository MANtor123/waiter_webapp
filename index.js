var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('flash')

var app = express();

mongoose.connection.on("error", function(err) {
  console.log("Mongo error : ");
  console.log(err);
});

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiter";

mongoose.connect(mongoURL, function(err) {
  if (err) {
    console.log('Error Connecting to DB: ' + err);
  } else {
    console.log('connection to DB is successful');
  }
});


'use strict';
var waiterSche = mongoose.model('waiterSche', {
  username: String,
  days: Array
});
// console.log(waiterSche.find());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))



app.get('/waiterDays/:username', function(req, res, done) {
  var username = req.params.username;

  waiterSche.findOne({
    username: username
  }, function(err, results) {
    if (err) {
      console.log(err);
    } else if (!results) {
      waiterSche.create({
        username: username,
        days: []
      });
    }
  });
  res.render('index', {
    username: username
  });

});

var waiterLits = {};

app.post('/waiterDays/:username', function(req, res, done) {
  var username = req.params.username
  var week = req.body.week;

  waiterSche.findOneAndUpdate({
    username: username
  }, {
    days: week
  }, function(err, results) {
    //console.log(results);
    if (err) {
      return done(err)
    }

    if (results === null || results === '') {
      console.log('cannot add blank row');
      return results;
    }
    // res.render('workSch', {
    //   username: username
    // });
    res.redirect('/days')
  });

});

app.get('/days', function(req, res, next) {

  function background(weekdayColor){

      if(weekdayColor === 3){
      return 'green'

    }

    if(weekdayColor > 3 ){
      return 'red'
    }

    if(weekdayColor < 3){
      return 'orange'
    }
  }



  var Sunday = [];
  var Monday = [];
  var Tuesday = [];
  var Wednesday = [];
  var Thursday = [];
  var Friday = [];
  var Saturday = [];

  waiterSche.find({}, function(err, results) {
    if (err) {
      return next(err)
    } else {



      for (var i = 0; i < results.length; i++) {


        var username = results[i].username
        var curWaiterDays = results[i].days;


        for (var ii = 0; ii < curWaiterDays.length; ii++) {

          if (curWaiterDays[ii] === 'Sunday'){
            Sunday.push(username);
          }
          if (curWaiterDays[ii] === 'Monday') {
            Monday.push(username)
          }
          if (curWaiterDays[ii] === 'Tuesday') {
            Tuesday.push(username)
          }
         if (curWaiterDays[ii] === 'Wednesday') {
            Wednesday.push(username)
          }
          if (curWaiterDays[ii] === 'Thursday') {
            Thursday.push(username)
          }
          if (curWaiterDays[ii] === 'Friday') {
            Friday.push(username)
          }
          if (curWaiterDays[ii] === 'Saturday') {
            Saturday.push(username)
          }

        }
      }
    };


    res.render('workSch', {
      Sunday: Sunday,
      sundayColor: background(Sunday.length),
      Monday: Monday,
      mondayColor: background(Monday.length),
      Tuesday: Tuesday,
      tuesdayColor: background(Tuesday.length),
      Wednesday: Wednesday,
      wednesdayColor: background(Wednesday.length),
      Thursday: Thursday,
      thursdayColor: background(Thursday.length),
      Friday: Friday,
      fridayColor: background(Friday.length),
      Saturday: Saturday,
      saturdayColor: background(Saturday.length)

    });
  })
});

app.post('/clear', function(req, res) {
  waiterSche.remove({}, function(err, remove) {
if (err) {
  console.log(err);
}
else {

  res.render('workSch')
}

  })
});

const port = process.env.PORT || 8000;
app.use(function(err, req, res, next) {
  res.status(500).send(err.stack);
})

app.listen(port, function() {
  console.log('Example app listening at :' + port)
});
