import {resdata, errdata} from '../../../utils/serve';
import qiniu from 'qiniu';
import {qiniuConfig} from '../../../config/serverConfig'

exports.getUpLoadToken = async (ctx, next) => {
    try {
        var mac = new qiniu.auth.digest.Mac(qiniuConfig.AccessKey, qiniuConfig.SecretKey);
        var options = {
            scope: qiniuConfig.bucket,
            expires: 72000
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken= putPolicy.uploadToken(mac);
        return resdata('0000', '成功', {uploadToken: uploadToken});
    } catch (err) {
        return errdata(err);
    }
}