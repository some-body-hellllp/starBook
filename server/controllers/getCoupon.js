const db = require("../config/db");

const getCoupon = async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId:", userId);
  if (!userId) {
    return res.status(400).json({
      status: "error",
      message: "userId가 필요합니다.",
      data: null,
    });
  }

  const QUERY1 = `
    SELECT coupon_discount_rate, coupon_state
    FROM COUPONS
    WHERE user_id = ? 
    ORDER BY create_at DESC
  `;

  try {
    const [result] = await db.execute(QUERY1, [userId]);

    if (result.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "사용 가능한 쿠폰이 없습니다.",
        data: [],
      });
    }

    console.log("쿠폰 갱신 :", result);
    return res.status(200).json({
      status: "success",
      message: "쿠폰 갱신이 완료되었습니다.",
      data: result,
    });
  } catch (error) {
    console.error("쿠폰 갱신 실패 :", error);
    return res.status(500).json({
      status: "error",
      message: "서버 오류로 인해 쿠폰 정보를 가져올 수 없습니다.",
      data: null,
    });
  }
};

module.exports = getCoupon;
