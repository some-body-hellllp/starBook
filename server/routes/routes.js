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
// 사용자 정보 수정
router.put("/api/v1/auth/user", controllers.userModify);

// 미들웨어
router.post("/api/v1/auth/auth", controllers.auth); // 토큰 필요함

// 북마크

// 북마크 게시글 조회, 북마크 게시글 작성
router.get("/api/v1/bookmark", controllers.posts);
router.post("/api/v1/bookmark", controllers.createPost);

// 북마크 댓글 조회, 북마크 댓글 작성
router.get("/api/v1/bookmark/comment", controllers.comments);
router.post("/api/v1/bookmark/comment", controllers.createComment);

// 좋아요 추가, 좋아요 제거
router.post("/api/v1/bookmark/like", controllers.createLike);
router.delete("/api/v1/bookmark/like", controllers.removeLike);

// 코스 리스트 (인증이 필요한 enpoint 주소)
// 스탬프 정보 갱신용
router.get("/api/v1/auth/stamp", controllers.auth, controllers.stampCount); // 스탬프 페이지로 들어갈때 사용하면 될듯?
// router.get("/api/v1/auth/course", controllers.auth, controllers.course); // 스탬프 페이지로 들어갈때 사용하면 될듯?

// QR인증!!
// QR인증 시 방문 한 코스와 방문하지 않은 코스를 구별
router.post("/api/v1/auth/visit", controllers.auth, controllers.visit);

// 쿠폰 확인, 쿠폰 지급, 쿠폰 사용
router.get("/api/v1/auth/coupon", controllers.getCoupon);
router.post("/api/v1/auth/coupon", controllers.createCoupon);

module.exports = router;
