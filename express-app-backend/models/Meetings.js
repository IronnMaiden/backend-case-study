const mongoose = require( 'mongoose' );

const meetingSchema = new mongoose.Schema({
    _id:{
        type:Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        //default: Date.now(),
        required: true
    },
    startTime: {
        hours:{
              type: Number,
              required: true,
              min: 0,
              max: 23
        },
        minutes:{
            type: Number,
            required: true,
            min: 0,
            max:23
        }
    },
    endTime: {
        hours:{
            type: Number,
            required: true,
            min: 0,
            max: 23
      },
      minutes:{
          type: Number,
          required: true,
          min: 0,
          max:23
      }
    },
    description:{
        type: String,
        required: true
    },
    attendees: [String]
});



mongoose.model( 'Meetings', meetingSchema );