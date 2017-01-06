export const cookie='token'; //session存储名称
export const clientPath='/client'; //客户端地址
export const pageSize=10; //页面最大数量
export const maxUploadSize=1024*1024; //最大上传文件大小(KB)

//API信息
export const apiPath='/api'; //api地址
let uploadDefaultPath; //上传地址
let uploadDownloadPath; //下载地址
if(process.env.NODE_ENV==='production'){
    uploadDefaultPath='https://up.qiniu.com';
    uploadDownloadPath='https://oak0s7wv0.qnssl.com';
}else{
    uploadDefaultPath='http://up.qiniu.com';
    uploadDownloadPath='http://o8jc34hze.bkt.clouddn.com';
}
export const uploadPath=uploadDefaultPath;
export const downloadPath=uploadDownloadPath;