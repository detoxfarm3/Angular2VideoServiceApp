var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var video = require('../models/video');
var url = "mongodb://detoxfarm:qwer1234@ds119682.mlab.com:19682/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(url, function (err) {
    if (!err) {
        console.log("Connected to database");
    } else console.log("Error: " + err);
})

router.get('/videos', function (req, res) {
    video.find({}).exec(function (err, result) {
        if (!err)
            res.json(result);
        else
            console.log('not found - ' + err);
    });
});

router.get('/video/:id', function (req, res) {
    video.findById(req.params.id).exec(function (err, result) {
        if (!err)
            res.json(result);
        else
            console.log('not found - ' + err);
    });
});

router.post('/video', function (req, res) {
    var v = new video();
    v.title = req.body.title;
    v.url = req.body.url;
    v.description = req.body.description;
    console.log('posted a video');
    v.save(function (err, insertedvideo) {
        res.json(insertedvideo);
    })
});


router.put('/video/:id', function (req, res) {
    video.findByIdAndUpdate(req.params.id, {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new: true
    },
    function(err, updatedDoc) {
        if(!err) 
            res.json(updatedDoc);
        else
            res.send({err: err});
    })
});

router.delete('/video/:id', function(req, res) {
    video.findByIdAndRemove(req.params.id, function(err, deletedDoc) {
        if(!err)
            res.json(deletedDoc);
        else
            res.send({err: err})
    });
})

module.exports = router;