import { resdata, errdata } from '../../../utils/serve'
import { 
    userInfo
} from '../../modal/sql'

module.exports = {
    createdName: async(reqBody) =>{
        try {
            let respon = {};
            let Info = await userInfo.create(reqBody);
            respon = resdata('0000', '创建成功', Info);
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    }
}