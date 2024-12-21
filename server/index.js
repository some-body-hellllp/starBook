require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
app.use(express.json());

// CORS 설정
app.use(
  cors({
    origin: [
      "https://star-books.netlify.app", // 배포한 클라이언트 URL
      "http://localhost:5173", // 로컬 개발 환경 URL (Vite 개발 서버)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키 전송 허용
  })
);

// OPTIONS 요청 허용 (Preflight 요청 처리)
app.options("*", cors());

// 라우팅 설정
app.get("/", (req, res) => res.send("linked!"));
app.use("/", routes);

// 서버 배포시 아래 설정 사용
const port = process.env.DB_PORT || 3368;

// 서버 시작
app.listen(port, () => console.log(`서버가 ${port}번 포트에서 실행 중입니다.`));
