'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var poemSchema = Schema( {
    title: String,
    content: String,
    dateGenerated: Date,

} );    

module.exports = mongoose.model( 'Poem', poemSchema );


