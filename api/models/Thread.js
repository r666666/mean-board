const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Thread = new Schema({
  _id: {
    type: Number
  },
  threadData: {
    type: Array
  }
},{
  collection: 'thread'
});

module.exports = mongoose.model('Thread', Thread);