import {resdata, errdata} from '../../../utils/serve';
import qiniu from 'qiniu';
import {qiniuConfig} from '../../../config/serverConfig'
const bucket = 'nodeupdata';

exports.getUpLoadToken = async (ctx, next) => {
    try {
        var mac = new qiniu.auth.digest.Mac(qiniuConfig.AccessKey, qiniuConfig.SecretKey);
        var options = {
            scope: bucket,
            expires: 72000
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken= putPolicy.uploadToken(mac);
        return resdata('0000', 'success', {uploadToken: uploadToken});
    } catch (err) {
        return errdata(err);
    }
}