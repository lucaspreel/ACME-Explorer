'use strict';
/* ---------------ACTOR---------------------- */
const mongoose = require('mongoose');
const async = require('async');
const CronJob = require('cron').CronJob;
const CronTime = require('cron').CronTime;
const ObjectId = mongoose.Types.ObjectId;

const Actor = mongoose.model('Actors');
const Application = mongoose.model('Application');
const ExplorerStats = mongoose.model('ExplorerStats');

exports.list_all_actors = function (req, res) {
  Actor.find({ deleted: false }, function (err, actors) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(actors);
    }
  });
};

exports.create_an_actor = function (req, res) {
  const newActor = new Actor(req.body);

  const sessionActorRole = ['EXPLORER'];// fake variable value for testing purposes

  // if the new actor role is administrator or manager
  // and the session actor role is not administrator
  // then the actor cannot be created
  if ((newActor.role.includes('ADMINISTRATOR') || newActor.role.includes('MANAGER')) && !sessionActorRole.includes('ADMINISTRATOR')) {
    return res.status(403).send();
  }

  newActor.save(function (err, actor) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      } else {
        res.status(500).send(err);
      }
    } else {
      res.status(201).json(actor);
    }
  });
};

exports.create_many_actors = function (req, res) {
  // console.log(req.body);
  const allActors = req.body;
  console.log(allActors);

  Actor.insertMany(allActors)
    .then(function (docs) {
      res.json(docs);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
};

exports.read_an_actor = function (req, res) {
  Actor.findOne({ _id: req.params.actorId }).then((actor1) => {
    if (!actor1) {
      res.status(404).send();
    } else {
      Actor.findById(req.params.actorId, function (err, actor) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(actor);
        }
      });
    }
  })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.update_an_actor = function (req, res) {
  const sessionActorRole = ['EXPLORER'];// fake variable value for testing purposes
  const sessionActorId = 0;// fake variable value for testing purposes

  Actor.findOne({ _id: req.params.actorId }).then((actor1) => {
    if (!actor1) {
      res.status(404).send();
    } else {
      // if the session actor role is not administrator
      // the actor only can modify his or her own actor
      if (!sessionActorRole.includes('ADMINISTRATOR') && sessionActorId !== actor1._id) {
        return res.status(403).send();
      }

      Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
        if (err) {
          if (err.name === 'ValidationError') {
            res.status(422).send(err);
          } else {
            res.status(500).send(err);
          }
        } else {
          res.json(actor);
        }
      });
    }
  })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.delete_an_actor = function (req, res) {
  Actor.findOne({ _id: req.params.actorId }).then((actor1) => {
    if (!actor1) {
      res.status(404).send();
    } else {
      Actor.delete({ _id: req.params.actorId }, function (err, actor) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({ message: 'Actor successfully deleted' });
        }
      });
    }
  })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.ban_an_actor = function (req, res) {
  const sessionActorRole = ['ADMINISTRATOR'];// fake variable value for testing purposes

  Actor.findOne({ _id: req.params.actorId }).then((actor1) => {
    if (!actor1) {
      res.status(404).send();
    } else {
      if (!sessionActorRole.includes('ADMINISTRATOR')) {
        return res.status(403).send();
      }

      Actor.findOneAndUpdate({ _id: req.params.actorId }, { isActive: false }, { new: true }, function (err, actor) {
        if (err) {
          res.send(err);
        } else {
          res.json(actor);
        }
      });
    }
  })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.unban_an_actor = function (req, res) {
  const sessionActorRole = ['ADMINISTRATOR'];// fake variable value for testing purposes

  Actor.findOne({ _id: req.params.actorId }).then((actor1) => {
    if (!actor1) {
      res.status(404).send();
    } else {
      if (!sessionActorRole.includes('ADMINISTRATOR')) {
        return res.status(403).send();
      }

      Actor.findOneAndUpdate({ _id: req.params.actorId }, { isActive: true }, { new: true }, function (err, actor) {
        if (err) {
          res.send(err);
        } else {
          res.json(actor);
        }
      });
    }
  })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.list_explorer_stats = function (req, res) {

  let startYear = Number(req.params.startYear);
  let startMonth = Number(req.params.startMonth);
  let endYear = Number(req.params.endYear);
  let endMonth = Number(req.params.endMonth);
  let validYears = Array.from({length: 3}, (item, index) => (new Date().getFullYear()) - index);
  let validMonths = Array.from({length: 12}, (item, index) => index + 1);

  if(!validYears.includes(startYear))
  {
    res.status(422).send("Error: startYear is not a valid year.");
  }
  else if(!validMonths.includes(startMonth))
  {
    res.status(422).send("Error: startMonth is not a valid month.");
  }
  else if(!validYears.includes(endYear))
  {
    res.status(422).send("Error: endYear is not a valid year.");
  }
  else if(!validMonths.includes(endMonth))
  {
    res.status(422).send("Error: endMonth is not a valid month.");
  }
  else
  {
    
    const explorerId = req.params.explorerId;

    let aggregations = [
      {
        $project: {
           explorerId: "$explorerId",
           yearExpense: {
              $filter: {
                 input: "$yearExpense",
                 as: "singleYearExpense",
                 cond: {
                     $and: [
                         { $gte: [ "$$singleYearExpense.year", startYear ] },
                         { $lte: [ "$$singleYearExpense.year", endYear ] }
                     ]
                 }
              }
           },
           monthExpense: {
              $filter: {
                 input: "$monthExpense",
                 as: "singleMonthExpense",
                 cond: {
                     $and: [
                         { $gte: [ "$$singleMonthExpense.year", startYear ] },
                         { $lte: [ "$$singleMonthExpense.year", endYear ] },
                         { $gte: [ "$$singleMonthExpense.month", startMonth ] },
                         { $lte: [ "$$singleMonthExpense.month", endMonth ] }
                     ]
                 }
              }
           }
        }
     }
    ];

    //it is used unshift instead of push because according to the documentation the match has to be at the beggining to leverage the indexes
    if(typeof explorerId !== "undefined")aggregations.unshift({ $match : { explorerId: ObjectId(explorerId) } });
    // console.log("aggregations");
    // console.log(aggregations);

    ExplorerStats.aggregate(aggregations)
    .exec((err, results) => {

      if (err) 
      {
        console.log(err);
        res.status(500).send(err);
      } 
      else 
      {
        res.json(results);
      }

    });

  }

};

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  var d = new Date(str); 
  return d.toISOString()===str;
}

exports.createExplorerStatsJob = function () {

  let rebuildPeriod = '*/600 * * * * *';
  let explorerStatsJob = new CronJob(rebuildPeriod, function () {

    console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod)

    async.parallel([
      computeExplorerStats,
    ], 
    function (err, results) {

      if (err) 
      {
        console.log('Error computing datawarehouse: ' + err)
      } 
      else 
      {

        let explorerStats = results[0];

        //preparing data to masive upsert
        const bulkUpsert = explorerStats.map(function(singleExplorerStats) {

          var upsertConfig =   {
            updateOne: {
              filter: { explorerId: singleExplorerStats.explorerId },
              update: singleExplorerStats,
              upsert: true
            }
          };

          return upsertConfig;

        });

        // console.log("bulkUpsert");
        // console.log(bulkUpsert);

        ExplorerStats.bulkWrite(bulkUpsert)
        .then(function () {
          console.log('ExplorerStats successfully computed and saved at '+ new Date()); // Success
        })
        .catch(function (error) {
          console.log('Error saving explorerStats: ' + error)
        });
        
      }
    })

  }, null, true, 'Europe/Madrid');

  explorerStatsJob.setTime(new CronTime(rebuildPeriod));
  explorerStatsJob.start();
}

function computeExplorerStats(callback){

  Application.aggregate([
    // inner join with trips
    {
      $lookup:
          {
            from: 'trips',
            localField: 'trip_Id',
            foreignField: '_id',
            as: 'trip'
          }
    },
    // convert trip array to single json object
    {
      $unwind: '$trip'
    },
    // extract relevant fields and transform stringDate to date type
    {
      $project: {
        explorer_Id: '$explorer_Id',
        tripPrice: '$trip.price',
        applicationMoment: { $toDate: '$applicationMoment' }
      }
    },

    // extract year and month from date
    {
      $project: {
        explorer_Id: '$explorer_Id',
        tripPrice: '$tripPrice',
        year: { $year: '$applicationMoment' },
        month: { $month: '$applicationMoment' }
      }
    },

    // group data by explorer, year and month
    {
      $group: {
        _id: { explorer_Id: '$explorer_Id', year: '$year', month: '$month' },
        moneySpent: { $sum: '$tripPrice' }
      }
    },

    // put all fields in first level, now we have month expense
    {
      $project: {
        _id: 0,
        explorer_Id: '$_id.explorer_Id',
        year: '$_id.year',
        month: '$_id.month',
        moneySpent: '$moneySpent'
      }
    },

    // order data
    /*
      {
          $sort: { explorer_Id: 1, year: 1, month: 1}
      },
    */

    // up to this point the data is separated by months correctly

    /*
      facet to execute two group data by months and year separately
      it works, the result is two arrays, one for months data and one for years data
      but I couldn't join the resulting pipelines to have a single object for every explorer
    */
    /*
      {
          $facet: {
              "monthExpense": [
                  //group by explorer and create sub object with month expense
                  {
                      $group: {
                          _id: "$explorer_Id",
                          "months": {
                              $addToSet: {
                                  year: "$year",
                                  month: "$month",
                                  moneySpent: "$moneySpent"
                              }
                          }
                      }
                  },
                  //rename fields, delete grouping id
                  {
                      $project: {
                          _id: 0,
                          explorer_Id: "$_id",
                          months: "$months"
                      }
                  }
              ],
              "yearExpense": [
                  {
                      //group by explorer and year
                      $group: {
                          _id: {explorer_Id: "$explorer_Id", year: '$year'},
                          moneySpent : {$sum : "$moneySpent"}
                      }
                  },
                  //put all fields in first level, now we have year expense
                  {
                      $project: {
                          _id : 0 ,
                          explorer_Id: "$_id.explorer_Id",
                          year: "$_id.year",
                          moneySpent: "$moneySpent",
                      }
                  },
                  //create sub object with year expense
                  {
                      $group: {
                          _id: "$explorer_Id",
                          "years": {
                              $addToSet: {
                                  year: "$year",
                                  moneySpent: "$moneySpent"
                              }
                          }
                      }
                  },
                  //rename fields, delete grouping id
                  {
                      $project: {
                          _id: 0,
                          explorer_Id: "$_id",
                          years: "$years"
                      }
                  }
              ]
          }
      }
    */

    // other way to do the job without using $facet
    // in this case every explorer has an object in the resulting collection
    {
      $group: {
        _id: { explorer_Id: '$explorer_Id', year: '$year' },
        months: {
          $addToSet: {
            year: '$year',
            month: '$month',
            moneySpent: '$moneySpent'
          }
        },
        moneySpent: { $sum: '$moneySpent' }
      }
    },
    {
      $project: {
        _id: 0,
        explorer_Id: '$_id.explorer_Id',
        year: '$_id.year',
        months: '$months',
        moneySpent: { $sum: '$moneySpent' }
      }
    },
    {
      $group: {
        _id: { explorer_Id: '$explorer_Id' },
        months: {
          $addToSet: '$months'
        },
        years: {
          $addToSet: {
            year: '$year',
            moneySpent: { $sum: '$moneySpent' }
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        explorer_Id: '$_id.explorer_Id',
        months: '$months',
        years: '$years'
      }
    },

    // up to this point the data is ready as required, but lack of order
    // and has useless nested arrays

    // unwind months array to sort it by year and month
    { $unwind: '$months' },
    { $unwind: '$months' },
    {
      $sort: { explorer_Id: 1, 'months.year': 1, 'months.month': 1 }
    },
    {
      $group: {
        _id: { explorer_Id: '$explorer_Id' },
        // "months": {
        //    $addToSet: "$months"
        // },

        // when you unwind a field this has to be added via $push
        months: { $push: '$months' },
        // years: {$push:"$years"},

        // another array not unwinded has to be added via $addToSet
        years: {
          $addToSet: '$years'
        }

      }
    },
    {
      $project: {
        _id: 0,
        explorer_Id: '$_id.explorer_Id',
        months: '$months',
        years: '$years'
      }
    },

    // unwind years array to sort it by year
    { $unwind: '$years' },
    { $unwind: '$years' },
    {
      $sort: { explorer_Id: 1, 'years.year': 1 }
    },
    {
      $group: {
        _id: { explorer_Id: '$explorer_Id' },

        months: {
          $addToSet: '$months'
        },
        // months: {$push:"$months"},
        years: { $push: '$years' }
        // "years": {
        //    $addToSet: "$years"
        // },
      }
    },

    {
      $project: {
        _id: 0,
        explorerId: '$_id.explorer_Id',
        monthExpense: { $first: '$months' },
        yearExpense: '$years',
        moneySpent: { $sum: '$years.moneySpent' }
      }
    }

  ])
    .exec((err, results) => {

      if (err) 
      {
        console.log(err);
        callback(err, {})
      } 
      else 
      {
        callback(err, results)
      }

    });

}