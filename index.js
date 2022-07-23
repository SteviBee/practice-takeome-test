var debug = require('debug')('frontend-code-challenge');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('./lib/logger');
var cors = require('cors');


// Templating & routes changes added
const nunjucks = require("nunjucks");

const frontRoutes = require("./routes/front");
var users = require('./routes/users');

var app = express();
var log = logger(app);

// OG CODE --------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));

// More templeting addtions
nunjucks.configure("templates", {
  autoescape: true,
  express: app
});

app.set('view engine', 'html');



app.use('/users', users);


// Trying routes call - WNAT TO UNDO 7/22
app.use(frontRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  log.error(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  log.info(
    'Express server listening on http://localhost:%d',
    server.address().port
  );
});
