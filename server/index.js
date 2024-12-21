require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());
const allowedOrigins = ["https://star-books.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/", (req, res) => res.send("linked!"));
app.use("/", routes);

// 서버 배포시 아래에 있는거 사용
// const port = 3368; // 지금 하루에 한번씩 바꾸는중..이유는모름..
const port = process.env.DB_PORT || 3368;

// MySQL 데이터베이스 연결 후 서버 시작
app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
