var config = require('../filters');
console.log('当前环境: ', config.env);
const Sequelize = require("sequelize");
let sequelize = new Sequelize(config.sql.database,config.sql.username,config.sql.password,{
    host: config.sql.host,         //数据库主机IP  localhost
    dialect: config.sql.dialect,         //数据库类型   'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
    retry: {
        match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ETIMEDOUT/,
            /ESOCKETTIMEDOUT/,
            /EHOSTUNREACH/,
            /EPIPE/,
            /EAI_AGAIN/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/
        ],
        max: 5
    },
    pool: {              //连接池配置
        max: 5,
        min: 0,
        idle: 30000
    }
})

let connect = function(request, response) {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}
export{
    connect,
    sequelize,
    Sequelize
}