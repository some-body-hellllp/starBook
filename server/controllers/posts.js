const db = require("../config/db");

const posts = async (req, res) => {
  let userId = req.query.id || null; // 로그인한 유저의 ID
  let limit = req.query.limit || 5; // 한 번에 로드할 게시글 수, 기본값은 5
  let offset = req.query.offset || 0; // 현재까지 로드된 게시글 수, 기본값은 0
  console.log("id", userId, "limit", limit, "offset", offset);

  if (!limit || !offset) {
    return res.status(409).json({ error: "잘못된 접근입니다." });
  }

  try {
    // SQL 쿼리 작성 (페이징 처리)
    const QUERY = `
SELECT 
    p.post_id,
    p.post_location,
    p.post_content,
    p.user_name,
    p.create_at,
    p.image_path,
    p.user_profile,
    CASE 
        WHEN l.user_id IS NOT NULL THEN TRUE
        ELSE FALSE
    END AS liked,
    (SELECT COUNT(*) FROM LIKES l2 WHERE l2.post_id = p.post_id) AS like_count,
    (SELECT COUNT(*) FROM COMMENTS c2 WHERE c2.post_id = p.post_id) AS comment_count
FROM 
    POSTS p
LEFT JOIN 
    LIKES l ON p.post_id = l.post_id AND l.user_id = ?
ORDER BY 
    p.create_at DESC
LIMIT ? OFFSET ?;

    `;

    // db.execute로 쿼리 실행
    const [posts] = await db.execute(QUERY, [userId, limit, offset]);

    // 결과 반환
    res.status(200).json({ status: "success", message: "게시글 불러오기 성공", data: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "게시글 목록을 가져오지 못했습니다." });
  }
};

module.exports = posts;
