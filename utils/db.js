import mysql from 'mysql2'
import loggerUtil from './logger.js';
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

connection.connect((err) => {
  if (err) {
    return loggerUtil.error('Server: Error connecting to the database:', err);
  }
  
  // Query the server to determine if it's MariaDB or MySQL
  connection.query("SELECT VERSION()", (err, results) => {
    if (err) {
      loggerUtil.error('Error fetching database version:', err);
    } else {
      const versionInfo = results[0]['VERSION()'];
      if (versionInfo.includes('MariaDB')) {
        loggerUtil.info('Connected to MariaDB!');
      } else {
        loggerUtil.info('Connected to MySQL!');
      }
    }
  });
});

const db = connection;
export default db;
