require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const autoIncrement = require('mongoose-auto-increment');

// const seedProjects = require('./seeds');

// seedProjects();

//Require routes
const indexRouter 			= require('./routes/index');
const projectRouter 		= require('./routes/projects');
const roomRouter 			= require('./routes/rooms');
const orderRouter			= require('./routes/orders');
const lineRouter			= require('./routes/lines');
const sublineRouter			= require('./routes/sublines');
const woodRouter 			= require('./routes/selections/woods');
const interiorRouter 		= require('./routes/selections/interiors');
const hingeRouter 			= require('./routes/selections/hinges');
const guideRouter 			= require('./routes/selections/guides');
const finishRouter 			= require('./routes/selections/finishes');
const drawerboxRouter 		= require('./routes/selections/drawerboxes');
const doorRouter 			= require('./routes/selections/doors');
const constructionRouter 	= require('./routes/selections/constructions');
const orderStateRouter		= require('./routes/selections/order-states');
const cabtypeRouter			= require('./routes/catalog/cabtypes');
const productRouter			= require('./routes/catalog/products');
const variationRouter		= require('./routes/catalog/variations');
const finishtypeRouter		= require('./routes/selections/taxonomy/finishtypes');
const doortypeRouter		= require('./routes/selections/taxonomy/doortypes');

const app = express();

//Connect to the database
mongoose.connect('mongodb+srv://sreader:rudy4joy@cluster0-xk1cv.mongodb.net/test?retryWrites=true&w=majority', 
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});
autoIncrement.initialize(db);

//use ejs-locals for all ejs templates
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup plublic assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Configure Passport and Sessions
app.use(session({
  secret: 'mount rainier',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use(function(req, res, next) {
	req.user = {
		'_id': '5d93ca79903e391025f90a63',
		'username':'scotty'
	}
	res.locals.currentUser = req.user;
  // set default page title
  res.locals.title = 'Raindog';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue on to next function in middleware chain
  next();
});

// Mount Routes
app.use('/', indexRouter);
app.use('/projects', projectRouter);
app.use('/projects/:id/rooms', roomRouter);
app.use('/projects/:id/rooms/:room_id/orders', orderRouter);
app.use('/projects/:id/rooms/:room_id/orders/:order_id/lines', lineRouter);
app.use('/projects/:id/rooms/:room_id/orders/:order_id/lines/:line_id/sublines', sublineRouter);
app.use('/woods', woodRouter);
app.use('/interiors', interiorRouter);
app.use('/hinges', hingeRouter);
app.use('/guides', guideRouter);
app.use('/finishes', finishRouter);
app.use('/drawerboxes', drawerboxRouter);
app.use('/doors', doorRouter);
app.use('/construction', constructionRouter);
app.use('/order-states', orderStateRouter);
app.use('/finishtypes', finishtypeRouter);
app.use('/doortypes', doortypeRouter);
app.use('/catalog/cabtypes', cabtypeRouter);
app.use('/catalog/products', productRouter);
//app.use('/catalog/products/:product_id/variations', variationRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
	console.log(err);
	req.session.error = err.message;
	res.redirect('back');
});

module.exports = app;
