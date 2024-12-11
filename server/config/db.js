const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("Connecting to MySQL with the following settings:");
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT || 3306, // MySQL 포트가 설정되지 않았다면 기본값 3306 사용
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL 연결 성공!");
  } catch (error) {
    console.error("MySQL 연결 실패:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
