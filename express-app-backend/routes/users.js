
const express = require('express');
const mongoose = require( 'mongoose' );

const router = express.Router();
const Users = mongoose.model( 'User' );

/*
    *** Sample queries ***
    http://localhost:3000/api/users
*/
router.get('/', function (req, res, next) {
    Users
        .find()
        .select( '-password' )
        .sort( 'email' )
        .exec(( error, results ) => {
            if( error ) {
                error.status = 500;
                return next( error );
            }

            res.json( results );
        });

});

module.exports = router;