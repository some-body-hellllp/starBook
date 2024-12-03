const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { connectDB } = require("./db/DB");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("linked!"));
app.use("/api", routes);

const port = process.env.PORT || 3000;

// MySQL 데이터베이스 연결 후 서버 시작
connectDB().then(() => {
  app.listen(port, () =>
    console.log(`서버가 ${port}번 포트에서 실행 중입니다.`)
  );
});
