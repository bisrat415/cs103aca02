'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var translateSchema = Schema( {
    actualInput: String,
    translation: String,
    dateGenerated: Date,

} );    

module.exports = mongoose.model('Translate', translateSchema);


