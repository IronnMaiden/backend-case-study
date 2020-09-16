const express = require( 'express' );

const mongoose = require( 'mongoose' );
const Meetings = mongoose.model( 'Meetings' );

const router = express.Router();

router.get( '/', function (req, res, next) {
    const date = req.query.date;
    const search = req.query.search;
    //const name = req.query.name;
    const email = req.query.email;

    // http://localhost:3000/meetings?date=present

    const filter = { date: { }, attendees: { $elemMatch: { } } };

    
    console.log(filter);
    if( email ) {
        filter.attendees.$elemMatch.email = email;
    }

    const today = new Date();

    switch( date ) {
        case "past":
            filter.date.$lt = today;
            break;
        case "present":
            filter.date.$eq = today;
            break;
        case "future":
            filter.date.$gt = today;
            break;
        default: 
            delete filter.date;
    }

    if( search ) {
        filter.description = {
            $regex: new RegExp( search, "i" )
        }
    }

    Meetings
        .find( filter )
        .exec(( error, results ) => {
            if( error ) {
                error.status = 500;
                return next( error );
            }

            res.json( results );
        });
});


//Adding a new user as attendee for a meeting
//page not found error
//PATCH /api/meetings/:meetingid?action=add_attendee?email=user@ex.com
//no result
//http://localhost:3000/meetings/5f60f202a89328479dde7119?action=add_attendee&email=divya@example.com
router.patch( '/:id', ( req, res, next ) => {
    const meetid= req.query.id;
    
    const addmail = req.query.email;

    Meetings
    .findByIdAndUpdate( meetid, { $push: {attendees:[addmail] }} )
    .exec(( err, oldmeet, meetWithUpdates ) => {
        if( err ) {
            err.status = 500;
            return next( err );
        }

        res.status( 200 ).json( meetWithUpdates );
    });
        
});






//PATCH /api/meetings/:meetingid?action=remove_yourself

//http://localhost:3000/meetings/5f60f202a89328479dde7119&email=cheesefingers23@orkut.com
//excuse from meet

//Unexpected token " in JSON at position 10
router.patch( '/', ( req, res, next ) => {
    const meetid= req.query.id;
    //const r_user = req.query.param.username;
    const r_mail = req.query.email
    const filter = { meetid, attendees: { $elemMatch: { } } };
    if(r_mail)
    {
        filter.attendees.$elemMatch.r_mail = r_mail;
    }
    Meetings
    .findOneAndRemove({filter})  
    .exec(( err, oldmeet, meetWithUpdates ) => {
        if( err ) {
            err.status = 500;
            return next( err );
        }

        res.status( 200 ).json( meetWithUpdates );
    });
        
});
















//POST /api/meetings
//Temporary query param: user id / email. We set the urlencoded form of ?email=jane.doe@example.com
//Add meeting
//now it is working
//http://localhost:3000/meetings/5f60f202a89328479dde7119
router.post( '/:id', ( req, res, next ) => {
    const meetid = req.query.id;
    const mail = req.query.email;
    
    if( !meetid ) {
        const err = new Error( 'meet should be included ' );
        err.status = 403;
        return next( err );
    }

    Meetings
        .create( meetid, ( err, meetWithId ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 200 ).json( meetWithId );
        });
});
























//GET /api/users

//http://localhost:3000/5f60f202a89328479dde7119
//get list of users
//getting [] 
router.get( '/', ( req, res, next ) => {
    Meetings
        .find(  { attendees} )
        
        .exec(( err, results ) => {
            if( err ) {
                
                err.status = 500;
                return next( err );
            }

            res.status( 200 ).json( results );
        });
});



module.exports = router;