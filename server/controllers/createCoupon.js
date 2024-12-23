const db = require("../config/db");
const { CurrentTime } = require("../config/date");

const createCoupon = async (req, res) => {
  const { userId, stampCard } = req.body;
  const time = CurrentTime();
  console.log("유저 아이디 :", userId);
  console.log("스탬프 개수 :", stampCard);

  const getCouponRate = (stampCard) => {
    // 스탬프 개수에 따른 할인율 반환
    if (stampCard === 0) {
      return 15; // 8개 이상일 때 15% 할인
    } else if (stampCard === 5) {
      return 10; // 5개 이상일 때 10% 할인
    } else if (stampCard === 3) {
      return 5; // 3개 이상일 때 5% 할인
    }
    return res.status(400).json({
      status: "error",
      message: "잘못된 요청입니다.",
      data: null,
    });
  };

  const discount = getCouponRate(stampCard);
  console.log("할인률 :", discount);

  // 이미 동일한 쿠폰이 발급되었는지 확인하는 쿼리
  const QUERY1 = `
    SELECT * 
    FROM COUPONS 
    WHERE user_id = ? AND coupon_discount_rate = ?
    ORDER BY create_at DESC
    LIMIT 1;
  `;

  // 새로운 쿠폰 삽입 쿼리
  const QUERY2 = `
    INSERT INTO COUPONS (user_id, coupon_discount_rate, create_at)
    VALUES (?, ?, ?);
  `;

  try {
    // 동일한 쿠폰 존재 여부 확인
    const [existingCoupon] = await db.execute(QUERY1, [userId, discount]);
    if (existingCoupon.length > 0) {
      console.log("동일한 할인율의 쿠폰이 이미 발급되었습니다.");
      return res.status(400).json({
        status: "error",
        message: "이미 동일한 할인율의 쿠폰이 발급되었습니다.",
        data: existingCoupon[0], // 기존 쿠폰 정보 반환
      });
    }

    // 새 쿠폰 삽입
    const result = await db.execute(QUERY2, [userId, discount, time]);
    console.log(`사용자에게 ${discount}% 할인 쿠폰이 지급되었습니다.`);
    return res.status(200).json({
      status: "success",
      message: `${discount}% 할인 쿠폰이 지급되었습니다.`,
      data: result,
    });
  } catch (error) {
    console.error("쿠폰 지급 중 오류 발생:", error);
    return res.status(500).json({ status: "error", message: "쿠폰 발급 실패" });
  }
};

module.exports = createCoupon;
