module.exports = {
    env: 'development', //环境名称
    db:{
        dbName:"nodeapi",
        dbHost:"mongodb://localhost:27017/",

    },
    jwt:"test_token",
    qiniu:{
        bucket:'nodeupdata',
        AccessKey:"_GZy0O_nhOY1uwzgLYGqNApVo1sCJhwmORqzNDba",
        SecretKey:"mcuwJcmtHRwW06BpF7sj_nuTR4Y-QfPNMZt7a0jC",
    },
    yunpian:{
        
    },
    sql:{
        username:"root",
        host:"47.52.246.137",
        password:"123456",
        database:"galaxy",
        dialect:"mysql"
    }
}