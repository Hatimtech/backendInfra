
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const banksRouter = require('./routes/banksRoutes');
const rolesRouter = require('./routes/keyclockRoutes/rolesRoutes');
const scopeRouter = require('./routes/keyclockRoutes/ScopeRoutes');
const resourceRouter = require('./routes/keyclockRoutes/ResourceRoutes');
const policyRouter = require('./routes/keyclockRoutes/PolicyRoutes');
const permissionRouter = require('./routes/keyclockRoutes/PermissionRoutes');
const openKmRouter = require('./routes/OpenKmRoutes')
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const app = express();
const swaggerSpec =  require('./middlewares/swaggerConfig')

dotenv.config();
mongoose.connect(process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/',usersRouter);
app.use('/', banksRouter);
app.use('/', rolesRouter);
app.use('/', scopeRouter);
app.use('/', resourceRouter);
app.use('/', policyRouter);
app.use('/', permissionRouter);
app.use('/', openKmRouter);



/**
 * swagger api config
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.swaggerSpec()));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
