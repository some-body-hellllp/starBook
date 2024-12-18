// 유저 정보 조회
const users = require("./users");
// 회원가입,로그인
const join = require("./join");
const login = require("./login");
// 미들웨어 (토큰인증)
const auth = require("../middleware/auth");
// 코스 , 유저 방문 코스
const course = require("./course");
const visit = require("./visit");
// 네이버 로그인, 네이버 유저 정보 조회
const naverLogin = require("./naverLogin");
const naverUser = require("./naverUser");
// 유저 정보 수정
const userModify = require("./userModify");
// 게시글 조회 ,게시글 작성
const posts = require("./posts");
const createPost = require("./createPost");
// 댓글 조회, 댓글 작성
const comments = require("./comments");
const createComment = require("./createComment");
// 좋아요, 좋아요 제거
const createLike = require("./createLike");
const removeLike = require("./removeLike");
module.exports = {
  users,
  join,
  login,
  auth,
  course,
  visit,
  naverLogin,
  naverUser,
  userModify,
  posts,
  createPost,
  comments,
  createComment,
  createLike,
  removeLike,
};
