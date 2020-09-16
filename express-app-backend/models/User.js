const mongoose = require( 'mongoose' );

const usersSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

usersSchema.path('email').validate(function (email) {
    return emailRegex.test(String(email).toLowerCase());
}, 'Invalid email id format')


mongoose.model( 'User', usersSchema );