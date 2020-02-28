let dbName = "nodeapi";
let dbHost = "mongodb://localhost:27017/";
let mongoose = require("mongoose");
exports.connect = function(request, response) {
    mongoose.connect(dbHost + dbName,{useUnifiedTopology:true,useNewUrlParser: true}); // useMongoClient防止报错
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
      console.log('connet success!');
    });
}