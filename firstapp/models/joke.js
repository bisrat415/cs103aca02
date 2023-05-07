'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var jokeSchema = Schema( {
    actualUserInput: String,
    joke: String,
    dateGenerated: Date,

} );    

module.exports = mongoose.model( 'Joke', jokeSchema );


