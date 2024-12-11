const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// 사용자 모델 정의
const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER, // 데이터 타입 명확히 지정
      allowNull: false,
      primaryKey: true, // 프라이머리 키로 지정 (필요 시)
      autoIncrement: true, // 자동 증가 (필요 시)
    },
    user_login_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_login_pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // 테이블 이름 명시 안 하면 알아서 users로 해석하는듯 자세한건 gpt에게..
    tableName: "user", // 테이블 이름을 user로 명시
    timestamps: false, // createdAt, updatedAt 컬럼을 사용하지 않도록 설정
  }
);

module.exports = User;
