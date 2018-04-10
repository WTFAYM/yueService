let config = require('../../config/db');
let mysql = require('mysql');

let pool = mysql.createPool(config);

module.exports = {
    pool: pool,
    getConnection: () => new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        })
    }),
};