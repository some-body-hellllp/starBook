require("dotenv").config;
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
console.log("데이터베이스 호스트:", process.env.DB_HOST);
console.log("데이터베이스 포트:", process.env.DB_PORT);
console.log("데이터베이스 이름:", process.env.DB_NAME);
console.log("데이터베이스 사용자:", process.env.DB_USER);

const db = pool.promise();

module.exports = db;
