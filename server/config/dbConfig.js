var config = require('../filters');
console.log('当前环境: ', config.env);
let mongoose = require("mongoose");
exports.connect = function(request, response) {
    mongoose.connect(config.db.dbHost + config.db.dbName,{useUnifiedTopology:true,useNewUrlParser: true}); // useMongoClient防止报错
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('mongoose connet success!');
    });
}