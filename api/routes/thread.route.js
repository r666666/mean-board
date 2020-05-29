const express = require('express');
const threadRoutes = express.Router();

let Thread = require('../models/Thread');
let ThreadInfo = require('../models/ThreadInfo');

// Get && increment globalIndex(unique thread value)
threadRoutes.route('/getGlobalIndex').get(function (req, res) {
  ThreadInfo.findOne(function(err, info) {
    if(!info) {
      return next(new Error('Could not load Document'));
    } else {
      res.json(info.threadsGlobalIndex);

      info.threadsGlobalIndex++;
      info.save();
    }
  });
});

threadRoutes.route('/add').post(function (req, res) {
  let thread = new Thread(req.body);
  thread.save()
    .then(thread => {
      res.status(200).json({'thread': 'thread in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

threadRoutes.route('/get/:id').get(function (req, res) {
  Thread.findById(req.params.id, function(err, thread) {
    if (!thread)
      return next(new Error('Could not load Document'));
    else {
      res.json(thread);
    }
  });
});

threadRoutes.route('/post/:id').post(function (req, res) {
  Thread.findById(req.params.id, function(err, thread) {
    if (!thread)
      return next(new Error('Could not load Document'));
    else {
      thread.threadData = req.body.threadData;

      thread.save().then(thread => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = threadRoutes;