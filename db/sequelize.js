/*
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://phgr:admin123@piratasgram.cluster-cdvrodzdwd8q.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false')
    module.exports = mongoose;
*/

const Sequelize = require('sequelize');
const config = require('config');
const connection = new Sequelize(config.get('mysql.database'), config.get('mysql.user'), config.get('mysql.pass'), {
    host: config.get('mysql.server'),
    dialect:'mysql',
    ssl: true,
    timestamps: false,
    dialectOptions: {
        socketPath: `/cloudsql/${config.get('mysql.server')}`
    }
    
    
});

connection.authenticate()
    .then(function(){
        console.log('Mysql has benn connected');
    })
    .catch(function(err){
        console.log('Conection failure'+err);
    })
    .done();

module.exports = connection;
