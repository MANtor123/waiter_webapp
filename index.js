'use strict';

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


var waiterSche = mongoose.model('waiterSche', {
  name: String,
  days: {
    Sunday: Boolean,
    Monday: Boolean,
    Tuesday: Boolean,
    Wednesday: Boolean,
    Thursday: Boolean,
    Friday: Boolean,
    Saturday: Boolean
  }


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



app.get('/waiterDays/:username', function(req, res) {
  var username = req.params.username
//console.log(username);

  waiterSche.findOne({name: username}, function(err,results){
    if(err){
      console.log(err);
    }

    else{
      if (!results) {
        //console.log(!results);
      res.render('index', {
        username : username

      })
    }

    else {
      res.render('index', {
        username : username
        //output : username
      })


    }

}
  })

})

var waiterLits = {};

app.post('/waiterDays/:username', function(req, res) {
      var username = req.params.username
      console.log(username);
      var week = req.body.week
      console.log(week);


      if(!Array.isArray(week)){
        week = [week];
      }

      week.forEach(function(day) {
        waiterLits[week] = true
      })

      // var waiterSchedule = {
      //   name: username,
      //   days: week
      // }

      waiterSche.findOneAndUpdate({
            name: username
          }, {
            days: waiterLits
          },
          function(err, results) {
            if (err) {
              console.log(err);
            } else {
              if (!results) {
                var newWaiter = new waiterSche({
                  name: username,
                  days: waiterLits
                })



                newWaiter.save(function(err, results) {
                    if (err) {
                      console.log(err);
                    }

                   else {

                    res.redirect('/waiterDays:username')
                  }


                })

                  }

                else {
                  // req.flash('error','Days has been successfuly updated');
                  // res.redirect('/waiterDays');
                  res.render('workSch', {
                    scheduleDays : username + week
                  })
                  }

              // if (results) {
              //   waiterLits.push(username)
              //   console.log(waiterLits);
              // }


              // else {

              // }
            // })


          }
        })
        });



          app.post('/days', function(res, req) {

            res.redirect('/waiterDays/:username')
          })


          const port = process.env.PORT || 8000; app.use(function(err, req, res, next) {
            res.status(500).send(err.stack);
          })

          app.listen(port, function() {
            console.log('Example app listening at :' + port)
          });
