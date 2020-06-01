const db = require('../../../config/sqlConfig')
import { sqlClass } from '../util';
const Sequelize = db.sequelize
const User = Sequelize.import('../../modal/sql/schema/user')
User.sync({force: false});
class UserModel extends sqlClass{
    constructor(){
        super()
        this.sqlModel = User;
        this.dataType = {
            id:'',//
            username:'',
            password:'',
            email:'',
            roles_id:'',
        }
    }
}
let userModel = new UserModel()
export {userModel}