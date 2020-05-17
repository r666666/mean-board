const express = require('express');
const boardRoutes = express.Router();

let Board = require('../models/Board');

// Get all boards
boardRoutes.route('/').get(function (req, res) {
  Board.find(function (err, board){
    if (err) {
      console.log(err);
    } else {
      res.json(board);
    }
  });
});

boardRoutes.route('/add').post(function (req, res) {
  let board = new Board(req.body);
  board.save()
    .then(board => {
      res.status(200).json({'board': 'board in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

boardRoutes.route('/get/:id').get(function (req, res) {
  Board.findById(req.params.id, function(err, board) {
    if (!board)
      return next(new Error('Could not load Document'));
    else {
      res.json(board);
    }
  });
});

boardRoutes.route('/update/:id').post(function (req, res) {
  Board.findById(req.params.id, function(err, board) {
    if (!board)
      return next(new Error('Could not load Document'));
    else {
      board.threadList.push(req.body.index);
      
      board.save().then(board => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

module.exports = boardRoutes;