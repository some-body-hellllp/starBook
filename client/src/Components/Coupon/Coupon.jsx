import "./Coupon.css";

export default function Coupon() {
  return (
    <section className="couponBox">
      <div className="couponSelect">
        <div className="couponTab" id="myCoupon">
          내 쿠폰
        </div>
        <div className="couponTab" id="expiration">
          만료 쿠폰
        </div>
      </div>
      <div>
        <div className="eventCoupon">
          <div>
            <div className="percent">5%</div>
            <div className="stamp">스탬프 3개 완료</div>
            <div className="maximum">최대 2000원 할인</div>
          </div>
          <div>
            <div className="eventButtonBox">
              <button className="eventButton">사용하기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
