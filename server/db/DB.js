const { Sequelize } = require("sequelize");

// .env 파일의 환경 변수 사용
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

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
