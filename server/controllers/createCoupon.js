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

  const QUERY2 = `
    INSERT INTO COUPONS (user_id, coupon_discount_rate, create_at)
    VALUES (?, ?, ?);
  `;

  try {
    const result = await db.execute(QUERY2, [userId, discount, time]);
    console.log(`사용자 에게 ${discount}% 할인 쿠폰이 지급되었습니다.`);
    console.log(result);
    return res.status(200).json({ status: "success", message: `${discount}% 할인 쿠폰이 지급되었습니다.` });
  } catch (error) {
    console.error("쿠폰 지급 중 오류 발생:", error);
    return res.status(500).json({ status: "error", message: "쿠폰 발급 실패" });
  }
};

module.exports = createCoupon;
