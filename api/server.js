const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./DB');

const boardRoute = require('./routes/board.route');
const threadRoute = require('./routes/thread.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('Database is connected'); },
  err => { console.log('Cannot connect to the database'+ err);
});

const app = express();
app.use(bodyParser.json({limit: '1gb', extended: true}));
app.use(bodyParser.urlencoded({limit: '1gb', extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/meanChan')));

app.use('/board', boardRoute);
app.use('/thread', threadRoute);
app.use('/files', express.static(__dirname + '../../uploads'));

app.use('/', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/meanChan', 'index.html'));
});

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});