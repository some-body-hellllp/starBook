require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("linked!"));
app.use("/", routes);

// 서버 배포시 아래에 있는거 사용
const port = 3307;
// const port = process.env.DB_PORT || 3307;

// MySQL 데이터베이스 연결 후 서버 시작
app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
