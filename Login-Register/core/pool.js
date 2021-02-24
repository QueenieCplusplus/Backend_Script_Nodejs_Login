const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */

// my sql port 預設為 3306
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root', 
    password: '20172021', 
    database: 'www'
});

pool.getConnection((err, connection) => {
    if(err) 
        console.error("Something went wrong connecting to the database ...");
    
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
