const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// 모든 사용자 가져오기
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "사용자 목록을 가져오지 못했습니다." });
  }
});

// 사용자 추가하기
router.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 이메일 중복 확인
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "이미 사용 중인 이메일입니다." });
    }

    // 새로운 사용자 생성
    const newUser = await User.create({ name, email, password });
    console.log("새 사용자 추가됨:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("사용자 생성 중 오류 발생:", error);
    res.status(500).json({ error: "사용자를 생성하지 못했습니다." });
  }
});

module.exports = router;
