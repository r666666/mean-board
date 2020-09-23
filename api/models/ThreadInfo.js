const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ThreadInfo = new Schema({
  threadsGlobalIndex: {
    type: Number
  }
},{
  collection: 'threadInfo'
});

module.exports = mongoose.model('ThreadInfo', ThreadInfo);