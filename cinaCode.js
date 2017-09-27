waiterSche.findOneAndUpdate({
      name: username
    }, {
      week: waiterLits
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

            } else {

              res.render('index', {
                scheduleDays: results
              })
            }
            // })
            // });

          });

        // if (results) {
        //   waiterLits.push(username)
        //   console.log(waiterLits);
        // }


        // else {

        // }
      });


    }
