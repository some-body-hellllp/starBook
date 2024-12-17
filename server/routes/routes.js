const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers.js");

// 유저 설정

// 모든 사용자 가져오기
router.get("/api/v1/auth/user", controllers.users);
// 사용자 추가하기
router.post("/api/v1/auth/user", controllers.join);
router.post("/api/v1/auth/naverLogin", controllers.naverLogin, controllers.naverUser);
// 로그인
router.post("/api/v1/auth/login", controllers.login); // 토큰 발금

// 북마크

// 북마크 게시글 조회  게시글에 표시되는 댓글 숫자는 join같은거 끼워서 쓰면 될거같음(게시글 번호가 같은 행의 댓글 번호? 이런거)
router.get("/api/v1/bookmark");
// 북마크 댓글 조회
router.get("/api/v1/bookmark/comment");
// 북마크 게시글 작성
router.post("/api/v1/bookmark");
// 북마크 댓글 작성
router.post("/api/v1/bookmark/comment");

// 미들웨어
router.post("/api/v1/auth/auth", controllers.auth); // 토큰 필요함

// 코스 리스트 (인증이 필요한 enpoint 주소)
// 방문한 코스와 방문하지 않은 코스를 구분하여 모두 불러옴
router.get("/api/v1/auth/course", controllers.auth, controllers.course); // 스탬프 페이지로 들어갈때 사용하면 될듯?

// QR인증!!
// QR인증 시 방문 한 코스와 방문하지 않은 코스를 구별하여 방문 한 코스라면 실패 방문하지 않았다면 user_course에 방문이력을 저장
router.post("/api/v1/auth/visit", controllers.auth, controllers.visit);

module.exports = router;
