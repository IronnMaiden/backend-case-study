const express = require( 'express' );
const path = require( 'path' );

const mongoose = require( 'mongoose' );
const Meetings = mongoose.model( 'Meeting' );

const router = express.Router();


router.get('/',( req, res, next ) => {
    const date = req.query.date;
    console.log("date is");
    console.log(date); //
    const email = req.query.email;
    

    const filter = { date };
    
    if( email ) {
        filter.attendees = email;
        console.log("email is:");
        console.log(email);
    }
    
    console.log(filter);
    console.log( Meetings.collection.collectionName );
    
    Meetings
        .find( filter )
        .exec(( error, results ) => {
            if( error ) {
                error.status = 500;
                return next( error );
            }

            res.json( results );
            console.log(results);
        });

    });

module.exports = router;


//http://localhost:3000/calender?date=2020-09-11&email=gddaboss@gmail.com




//getting empty array only

//http://localhost:3000/calender?date=2020-09-09T00:00:00.000Z&email=jane.doe@example.com

//http://localhost:3000/calender?date=2020-09-09?email=jane.doe@example.com
//find meets with this date and this mail
//http://localhost:3000/calender?date=2020-09-10T00:00:00.000Z?email=jane.doe@example.com
//http://localhost:3000/calender?date=2020-09-09T00:00:00.000Z?email=mark.smith@example.com
//console.log(email);
    // Query parameter example
    // GET
    // http://localhost:3000/calendar?date=2020-09-15?email=user@mail.com before authentication
    // http://localhost:3000/calendar?date=2020-09-15 after authentication

    // Meetings
    // GET
    // date = (ALL/TODAY..) search =  description
    // http://localhost:3000/meetings?date=ALL?search="somevalue"
    // http://localhost:3000/meetings?date=ALL
    // http://localhost:3000/meetings

    // POST
    // http://localhost:3000/meetings 

    // PATCH
    // http://localhost:3000/meetings?action=add_attendees
    // http://localhost:3000/meetings?action=excuse_yourself