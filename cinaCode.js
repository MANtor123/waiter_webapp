// waiterSche.findOneAndUpdate({
//       name: username
//     }, {
//       week: waiterLits
//     },
//     function(err, results) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (!results) {
//           var newWaiter = new waiterSche({
//             name: username,
//             days: waiterLits
//           })
//
//
//
//           newWaiter.save(function(err, results) {
//               if (err) {
//                 console.log(err);
//               }
//
//             } else {
//
//               res.render('index', {
//                 scheduleDays: results
//               })
//             }
//             // })
//             // });
//
//           });
//
//         // if (results) {
//         //   waiterLits.push(username)
//         //   console.log(waiterLits);
//         // }
//
//
//         // else {
//
//         // }
//       });
//
//
//     }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//     if (!Array.isArray(week)) {
//       week = [week];
//     }
//
//     // week.forEach(function(day) {
//     //   waiterLits[week] = true
//     //   // console.log(waiterLits[week]);
//     // })
//
//     // var waiterSchedule = {
//     //   name: username,
//     //   days: week
//     // }
//
//     waiterSche.findOneAndUpdate({
//           name: username
//         }, {
//           days: waiterLits
//         },
//         function(err, results) {
//           if (err) {
//             return done(err);
//           } else {
//             if (!results) {
//               var newWaiter = new waiterSche({
//                 name: username,
//                 days: waiterLits
//               })
//
//
//
//               newWaiter.save(function(err, results) {
//                   if (err) {
//                     return done(err);
//                   }
//
//
//                   if (results) {
//                     var newWaiter = new waiterSche({
//                       name: username,
//                       days: waiterLits
//                     })
//
//                     // console.log(results);
//
//
//
//
//                   } else {
//
//                     // req.flash('error','Days has been successfuly updated');
//                     // res.redirect('/waiterDays');
//                     res.render('workSch', {
//                       username
//                     })
//                   }
//
//
//                 }
//               })
//           })
//             }
