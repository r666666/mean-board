const express = require('express');
const threadRoutes = express.Router();
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const shell = require('shelljs');

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

threadRoutes.route('/get/:id').get(function (req, res) {
  Thread.findById(req.params.id, function(err, thread) {
    if (!thread)
      return next(new Error('Could not load Document'));
    else {
      res.json(thread);
    }
  });
});

threadRoutes.route('/update/:id').post(function (req, res) {
  Thread.findById(req.params.id, function(err, thread) {
    if (!thread)
      return next(new Error('Could not load Document'));
    else {
      thread.threadData = req.body;

      thread.save().then(thread => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

threadRoutes.route('/add').post(function (req, res) {
  const form = new IncomingForm();
      
  let post = {
    index: '',
    text: '',
    replies: [],
    files: []
  };

  form.parse(req).on('file', function(name, file) {
    post.files.push(handleUpload(file, req.headers.board, req.headers.id));
  })
    .on('field', function(name, field) {
      post[name] = field;
    })
    .on('error', function(err) {
      next(err);
    })
    .on('end', function() {
      let thread = new Thread({
        _id: post.index,
        threadData: post
      });

      thread.save().then(
        res.thread,
        res.end()
      );
    });
});

threadRoutes.route('/post/:id').post(function (req, res) {
  Thread.findById(req.params.id, function(err, thread) {
    if (!thread)
      return next(new Error('Could not load Document'));
    else {
      const form = new IncomingForm();

      let post = {
        index: '',
        text: '',
        replies: [],
        files: []
      };
      
      form.parse(req).on('file', function(name, file) {
        post.files.push(handleUpload(file, req.headers.board, req.headers.id));
      })
        .on('field', function(name, field) {
          post[name] = field;
        })
        .on('error', function(err) {
          next(err);
        })
        .on('end', function() {
          thread.threadData.push(post);

          thread.save().then(res.end());
        });
    }
  });
});

function handleUpload(file, board, id) {
  shell.mkdir('-p', 'uploads/' + board);
  shell.mkdir('-p', 'uploads/' + board + '/' + id);

  const extension = file.name.split('.').pop();

  let fileName = fs.readdirSync('uploads/' + board + '/' + id).length + '.' + extension;
  let fileType;

  if (extension === 'png' || extension === 'jpg' || extension === 'gif') {
    fileType = 'image';
  } else if (extension === 'mp3' || extension === 'mp4' || extension === 'mkv' || extension === 'webm') {
    fileType = 'video';
  } else {
    fileType = 'file';
  }
  
  fs.writeFile('uploads/' + board + '/' + id + '/' + fileName, fs.readFileSync(file.path), 'binary', function(err) {
    if (err) { throw err; }
  });

  return {
    path: '/../files/' + board + '/' + id + '/' + fileName,
    type: fileType
  };
}

module.exports = threadRoutes;