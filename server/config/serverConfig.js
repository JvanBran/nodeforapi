var config = require('../filters');
module.exports = {
    jwt_token:config.jwt,
    qiniuConfig:{
        bucket:config.qiniu.bucket,
        AccessKey:config.qiniu.AccessKey,
        SecretKey:config.qiniu.SecretKey
    }
}