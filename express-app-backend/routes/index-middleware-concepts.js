const express = require( 'express' );

const router = express.Router();

// req, res are enhanced Node.js objects for request and response
// router object has same routing functions that application object has
router.get( '/', ( req, res ) => {
    console.log( 'fn 2' );
    res.write( 'Hello Express!' );
    console.log( 'fn2 has sent response' );
});

router.get( '/', ( req, res ) => {
    console.log( 'fn 3' );
    res.send( 'Hello Express!' );
});

module.exports = router;