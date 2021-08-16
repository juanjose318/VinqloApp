let path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  mongoose = require('mongoose'),
  secret = require('./config').secret,
  MONGODB_URI = require('./config').MONGODB_URI,
  httpResponse = require('express-http-response');
let isProduction = process.env.NODE_ENV === 'production';
module.exports = (app) => {

  var allowedOrigins = [
    "http://localhost:4200",
    "http://localhost:4300",
    "http://localhost:3000",
    "http://165.22.228.6"
  ];
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  // Normal express config defaults
  app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }));
  app.use(bodyParser.json({ limit: '500mb' }));


  app.use(require('method-override')());
  app.use(express.static(path.join(__dirname, '/public')));

  app.use(session({ secret: secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

  if (!isProduction) {
    app.use(errorhandler());
  }

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).catch(err => {
    console.log(err)
  }).then(() => {
    console.log(`connected to db in ${isProduction ? 'Prod' : 'Dev'} environment`);
  });



  if (!isProduction) {
    mongoose.set('debug', true);
  }


// require models here like below
// require('./models/User');
  

  //require('./utilities/passport');

  require('./models/user')
  require('./models/post')
  require('./models/degree')
  require('./models/campus')
  require('./models/category')
  require('./models/community')
  require('./models/comment')
  require('./models/report')
  require('./models/notification')

  app.use(require('./routes'));

  app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(new httpResponse.NotFoundResponse('Server Path Not Found', 404));
  });

  app.use(httpResponse.Middleware);


}
