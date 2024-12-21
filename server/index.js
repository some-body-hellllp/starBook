require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // 모든 도메인 허용
    methods: "*", // 모든 메소드 허용 (GET, POST, PUT, DELETE 등)
  })
);

app.get("/", (req, res) => res.send("linked!"));
app.use("/", routes);

// 서버 배포시 아래에 있는거 사용
// const port = 3368; // 지금 하루에 한번씩 바꾸는중..이유는모름..
const port = process.env.DB_PORT || 3368;

// MySQL 데이터베이스 연결 후 서버 시작
app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
