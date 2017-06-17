var mongoose = require('mongoose')
var schema = mongoose.Schema;

var videoSchema = new schema({
    title: String,
    url: String,
    description: String
});

module.exports = mongoose.model('video', videoSchema, 'videos');
