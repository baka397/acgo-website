function isObjEmpty(obj) {
    // Speed up calls to hasOwnProperty
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
exports.isObjEmpty = isObjEmpty;

/**
 * 请求下个Promise
 * @param  {Object} err  错误信息
 * @param  {Object} data 传递数据
 * @return {Object}      Promise对象
 */
exports.nextPromise = function(err,data){
    return new Promise(function(resolve,reject){
        if(err) reject(err);
        else resolve(data);
    })
}

/**
 * 格式化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
exports.serialize = function(data){
    let str='';
    for(let key in data){
        str+=key+'='+encodeURIComponent(data[key])+'&';
    }
    str=str.replace(/\&$/,'');
    return str;
}

/**
 * 获取查询数据
 * @param  {Object} routing 路由对象
 * @return {Object}         查询数据
 */
exports.getQuery = function(routing){
    let query=Object.assign({},routing.locationBeforeTransitions.query);
    return query;
}

/**
 * 获取枚举数组
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          格式化后的数组
 */
exports.getEnumArray = function(enumObj){
    return Object.keys(enumObj).map((key)=>{
        return {
            value:key,
            name:enumObj[key]
        }
    })
}