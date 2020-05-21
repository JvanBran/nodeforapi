import {Sequelize,sequelize} from '../../../config/sqlConfig'
import {sqlClass} from '../util'
let userInfoDefine = sequelize.define("users",{
    mail: {
        type: Sequelize.STRING,      //数据类型  STRING,CHAR,INTEGER,FLOAT,FLOAT  ,BOOLEAN,TEXT(不限长度)
        primaryKey: true,       // 主键   默认false
        allowNull: false,         // 是否可以为空  默认true
        defaultValue: ' 33'                     
    },
    name: { type: Sequelize.STRING, allowNull: false  },
    password: { type: Sequelize.STRING(255) },
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    },
    {
        timestamps: false,      //是否自动添加时间戳
        freezeTableName: true // Model 对应的表名将与model名相同
    }
)
userInfoDefine.sync({
    force: true,  //   如果表存在 则删除表后重建
    logging:true  // 日志
})
class UserInfo extends sqlClass{
    constructor(){
        super()
        this.sequelizeModel = userInfoDefine;
        this.dataType = {
            mail:"",
            name:"",
            password:""
        }
    }
    
}
let userInfo = new UserInfo()
export {userInfo}