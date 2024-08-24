import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve('./server/database/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbName,
    port: config.dbport,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

export default pool;