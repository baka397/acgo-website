'use strict';
let express = require('express');
let router = express.Router();

exports.requestMapping = '/api';

router.all('/*', function (req, res, next) {
    console.log('test');
    next();
});

exports.router = router;