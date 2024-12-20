const db = require("../config/db");
const { CurrentTime } = require("../config/date");
const coupon = async (req, res) => {
  const { userId, stampCard } = req.body;
  const time = CurrentTime();
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
  const QUERY1 = `
    SELECT coupon_discount_rate
    FROM COUPONS
    WHERE user_id = ? AND coupon_discount_rate = ?
    ORDER BY create_at DESC
    LIMIT 1;  
`;

  try {
    // 중복되는 쿠폰을 확인하는 쿼리 실행
    const [result] = await db.execute(QUERY1, [userId, discount]);

    // 결과가 있다면 중복된 쿠폰이 존재하는 것
    if (result.length > 0) {
      return res.status(409).json({ status: "error", message: "이미 같은 쿠폰을 받은 적이 있습니다." });
    }

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
    }
  } catch (error) {
    console.error("쿠폰 중복 확인 중 오류 발생:", error);
    return res.status(409).json({ status: "error", message: "쿠폰 발급 실패" });
  }
};

module.exports = coupon;
