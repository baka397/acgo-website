'use strict';
/**
 * 追加contextPath
 * @param url   请求地址
 */
exports.appendContextPath = function(url) {
    let fullPath = __CONTEXT_PATH + url;
    if (/\/$/.test(__CONTEXT_PATH) && /^\//.test(url)) { // 判断是否存在两个“/”重叠的情况
        fullPath = __CONTEXT_PATH.replace(/\/$/, '') + url;
    } else if (!/\/$/.test(__CONTEXT_PATH) && !/^\//.test(url)) {
        fullPath = __CONTEXT_PATH + '/' + url;
    }
    return fullPath;
}