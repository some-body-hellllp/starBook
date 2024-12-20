const db = require("../config/db");

const useCoupon = async (req, res) => {
  const { userId, couponId } = req.body;

  // 유효성 검사
  if (!userId || !couponId) {
    return res.status(400).json({
      status: "error",
      message: "userId와 couponId가 필요합니다.",
      data: null,
    });
  }

  // 쿠폰 상태 변경 쿼리
  const QUERY = `
    UPDATE COUPONS
    SET coupon_state = 'disable'
    WHERE user_id = ? AND id = ? AND coupon_state = 'able';
  `;

  try {
    const [result] = await db.execute(QUERY, [userId, couponId]);

    // 상태 변경 확인
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "해당 쿠폰을 사용할 수 없거나 이미 사용되었습니다.",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "쿠폰이 성공적으로 사용 처리되었습니다.",
      data: null,
    });
  } catch (error) {
    console.error("쿠폰 상태 변경 실패:", error);
    return res.status(500).json({
      status: "error",
      message: "서버 오류로 인해 쿠폰 상태 변경에 실패했습니다.",
      data: null,
    });
  }
};

module.exports = useCoupon;
