var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var bcrypt = require('bcrypt');

var app = express();
var userModels = require('./models/users');

var Sequelize = require('sequelize')
// var connection = new Sequelize('makersbnb_dev', 'thadycondon', 'password')

,sequelize = new Sequelize('makersbnb_dev', 'rylangooch', 'password', {
     dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
     port:    5432, // or 5432 (for postgres)
   });

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  hooks: {
    afterValidates: function (user) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
  }
});




sequelize.sync().then(function() {
  // User.create ({
  //   username: 'THADY',
  //   password: '12345'
  // })
  User.findAll().then(function(users){
    console.log(users);
  })
})

var Space = sequelize.define('space', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  pricePerNight: Sequelize.INTEGER

});
User.hasMany(Space);
Space.belongsTo(User)

sequelize.sync().then(function() {

  // Space.create ({
  //
  //
  //   name: 'The entire Shard',
  //   location: 'Somewhere in London',
  //   pricePerNight: "400000000",
  //   userId: 4
  // })
  Space.findAll().then(function(spaces){
    console.log(spaces);
      });
})



// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   }, function (err) {
//     console.log('Unable to connect to the database:', err);
// });
//
// sequelize
//  .sync({ force: true })
//  .then(function(err) {
//    console.log('It worked!');
//  }, function (err) {
//    console.log('An error occurred while creating the table:', err);
//  });

 // User.create({
 //  username: 'john-doe',
 //  email: 'email@email.com',
 //  password: 'i-am-so-great'
 // }).then(function(user) {
 //  /* ... */
 // })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
module.exports = app;
if (!module.parent) {
http.createServer(app).listen(process.env.PORT, function(){
  console.log("Server listening on port " + app.get('port'));
});
}
