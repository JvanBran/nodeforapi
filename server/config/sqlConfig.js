var config = require('../filters');
const logUtil = require('../utils/logUtil')
console.log('当前环境: ', config.env);
const Sequelize = require('sequelize');
/**
 *
 * 配置数据库
 *
 * 第一个参数 boblog    数据库名字
 * 第二个参数 root      数据库名字
 * 第三个参数 password  数据库密码
 */
const sequelize = new Sequelize(config.sql.database,config.sql.username,config.sql.password,{
    host: config.sql.host,         //数据库主机IP  localhost
    dialect: config.sql.dialect,         //数据库类型   'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
    logging: log,
    dialectOptions: {
        charset: "utf8",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

function log(e){
    //响应开始时间
    const ms = new Date()
    logUtil.logSqlponse(e, ms);
}
module.exports = {
    sequelize
}