'use strict';
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const moment = require("moment");
const pkg = require('./package.json');

// 构建名称
let archiveFilePath = path.join(__dirname, pkg.name + '-' + pkg.version + '-' + moment().format("YYYYMMDDHHmmss") + '.zip');

//设置打包文件
let zipList=['favicon.ico', 'app.js', 'log.js', 'router.js', 'package.json', 'bin/**', 'config/**', 'controllers/**' , 'public/**', 'views/**', 'node_modules/**'];

// 设置打包路径
let output = fs.createWriteStream(archiveFilePath);
// 打包成zip
let zipArchive = archiver.create('zip', {});
// 监听异常事件
zipArchive.on('error', function(err){
	throw err;
});
zipArchive.pipe(output);
zipArchive.bulk([
    { src:zipList }
]);
zipArchive.finalize();
console.log('打包内容：\n-%s', zipList.join('\n-'));
console.log('打包路径：%s', archiveFilePath);