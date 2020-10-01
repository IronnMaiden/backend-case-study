const express = require( 'express' );
const path = require( 'path' );

const router = express.Router();

router.get( '/', ( req, res ) => {
    // res.sendFile(  );
    res.send( 'hello' );
});

router.put( '/', ( req, res ) => {
    res.send( 'Invalid Put request' );
});


router.patch( '/', ( req, res ) => {
    res.send( 'Invalid Patch request' );
});


router.delete( '/', ( req, res ) => {
    res.send( 'Invalid Delete request' );
});


router.post( '/', ( req, res ) => {
    res.send( 'Invalid Post request' );
});

module.exports = router;
