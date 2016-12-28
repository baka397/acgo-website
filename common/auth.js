'use strict';
const crypto = require('crypto');

function md5Hash(str){
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex').toUpperCase();
}

exports.md5Hash = md5Hash;

exports.getTokenParams=function(appId,appAlias){
    let timestamp=new Date().getTime()
    return {
        'x-req-token':md5Hash(appId+timestamp),
        'x-req-timestamp':timestamp,
        'x-req-project':appAlias
    }
}