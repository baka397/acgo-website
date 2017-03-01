'use strict';
let express = require('express');
let router = express.Router();
let auth = require('../../middlewares/auth');

exports.requestMapping = '/client';

router.get('*', auth.getToken, auth.getUser, function (req, res) {
    res.render('client',{
        user:req.user
    });
});

exports.router = router;