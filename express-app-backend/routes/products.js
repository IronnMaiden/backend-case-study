const express = require( 'express' );
const path = require( 'path' );

const mongoose = require( 'mongoose' );
const Product = mongoose.model( 'Product' );

const router = express.Router();

router.get( '/', ( req, res, next ) => {
    Product
        .find( /* { filter object properties } */ )
        // .select( '' ) // projection
        .exec(( err, results ) => {
            if( err ) {
                // keeping things simple we will send the backend error to the frontend - not a good idea usually
                err.status = 500;
                return next( err );
            }

            res.status( 200 ).json( results );
        });
});

router.get( '/:id', ( req, res, next ) => {
    res.send( 'I will send products' );
});

router.post( '/', ( req, res, next ) => {
    const product = req.body;
    
    if( !product ) {
        const err = new Error( 'Product should be included in request body' );
        err.status = 403;
        return next( err );
    }

    Product
        .create( product, ( err, productWithId ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 200 ).json( productWithId );
        });
});

router.patch( '/:id', ( req, res, next ) => {
    const id = req.params.id;
    const product = req.body;

    if( !product ) {
        const err = new Error( 'Product should be included in request body' );
        err.status = 403;
        return next( err );
    }

    Product
        .findByIdAndUpdate( id, { $set: product } )
        .exec(( err, oldProduct, productWithUpdates ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 200 ).json( productWithUpdates );
        });
});

router.delete( '/:id', ( req, res, next ) => {
    const id = req.params.id;

    Product
        .findByIdAndRemove( id )
        .exec(( err, results ) => {
            if( err ) {
                err.status = 500;
                return next( err );
            }

            res.status( 204 ).send( '' );
        });
});

module.exports = router;