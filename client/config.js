export const cookie='token'; //session存储名称
export const clientPath='/client'; //客户端地址
export const pageSize=10; //页面最大数量
export const searchDelay=0.3; //搜索延迟时间(s)

//API信息
export const apiPath='/api'; //api地址

//上传
export const maxUploadSize=2*1024*1024; //最大上传文件大小(KB)
export const coverCopperWidth=300; //裁剪宽度
export const coverCopperHeight=180; //裁剪高度
export const avatarCopperWidth=150; //头像裁剪宽度
export const avatarCopperHeight=150; //头像裁剪高度
export const acceptType='.jpg'; //接受的文件类型
let uploadDefaultPath; //上传地址
let uploadDownloadPath; //下载地址
if(process.env.NODE_ENV==='production'){
    uploadDefaultPath='https://up.qbox.me';
    uploadDownloadPath='https://oak0s7wv0.qnssl.com';
}else{
    uploadDefaultPath='http://up.qiniu.com';
    uploadDownloadPath='http://o8jc34hze.bkt.clouddn.com';
}
export const uploadPath=uploadDefaultPath;
export const downloadPath=uploadDownloadPath;

//表格颜色
export const chartColors = ['#1AB394','#4E5A8F','#EBCB6B','#BB7FB2','#DA7D2A','#FFCE55','#6ED5E6','#F57BC1','#DCB186','#647C9D'];
export const chartConfig = {
    legend:{
        display:false
    }
};