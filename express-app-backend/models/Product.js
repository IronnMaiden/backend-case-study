const mongoose = require( 'mongoose' );

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    category: {
        type: String,
        values: [ 'Electronics', 'Books', 'Clothes', 'Appliances' ],
        message: 'Unsupported category'
    },
    imageUrl: String
});

// generate a model class from the schema
// adds the generated class back to mongoose object
mongoose.model( 'Product', productSchema );