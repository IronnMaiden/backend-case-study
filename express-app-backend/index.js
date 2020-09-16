// execute database connection scipt (data/init.js)
require( './data/init' );

//const createError = require('http-errors');
const path = require( 'path' );
const express = require( 'express' );
const cors = require( 'cors' );
const indexRouter = require( './routes/index' );
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const calenderRouter = require( './routes/calender' );
const meetingsRouter = require( './routes/meetings' );


// Express Application object
const app = express();

// we can set any key-value pairs on the application object
// configure the templating engine to ejs ('views' and 'view engine' keys have to be set)
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

app.use( cors() );

app.use( '/', ( req, res, next ) => {
    console.log( 'Received req at', (new Date()).toTimeString() );
    
    next();

    console.log( 'Response sent at', (new Date()).toTimeString() );
});

app.use( express.static( path.join( __dirname, 'public' ) ) );

// to parse form data
app.use( express.urlencoded({
    extended: false
}));

// ajax-submitted JSON data
app.use( express.json());

app.use( '/',indexRouter );
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use( '/calender', calenderRouter );
app.use( '/meetings', meetingsRouter );


app.use(( req, res, next ) => {
    const error = new Error( 'Page not found' );
    error.status = 404;

    next( error );
});

// error handling middleware
app.use(( error, req, res, next ) => {
    res.status( error.status || 500 ).send( error.message );
    // res.render( 'error-page', {
    //     error
    // });
});

const PORT = process.env.PORT || 3000;

app.listen( PORT, ( err ) => {
    if( err ) {
        return console.error( err.message );
    }

    return console.log( `server started at http://localhost:${PORT}/` );
});



// execute database connection scipt (data/init.js)
/*require( './data/init' );
//const createError = require('http-errors');
const express = require( 'express' );
const path = require( 'path' );
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
//const cors = require( 'cors' );



const indexRouter = require( './routes/index' );
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const calenderRouter = require( './routes/calender' );
const meetingsRouter = require( './routes/meetings' );

// Express Application object
const app = express();
//app.use( cors() );

app.use( '/', ( req, res, next ) => {
    console.log( 'Received req at', (new Date()).toTimeString() );
    
    next();

    console.log( 'Response sent at', (new Date()).toTimeString() );
});

//app.use( express.static( path.join( __dirname, 'public' ) ) );

// to parse form data
app.use( express.urlencoded() );

// ajax-submitted JSON data
//app.use( express.json() );
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( '/', indexRouter );
app.use('/users',usersRouter)
app.use( '/calender', calenderRouter );
app.use( '/meetings', meetingsRouter );


app.use(( req, res, next ) => {
    const error = new Error( 'Page not found' );
    error.status = 404;

    next( error );
});
/*app.use(function (req, res, next) {
    next(createError(404));
});*/
// error handling middleware
/*app.use(( error, req, res, next ) => {
    res.status( error.status || 500 ).send( error.message );
    // res.render( 'error-page', {
    //     error
    // });
});*/

/*const PORT = process.env.PORT || 3000;

app.listen( PORT, ( err ) => {
    if( err ) {
        return console.error( err.message );
    }

    return console.log( `server started at http://localhost:${PORT}/` );
});*/
/*app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        message: res.locals.message
    });
});*/
//module.exports = app;*/