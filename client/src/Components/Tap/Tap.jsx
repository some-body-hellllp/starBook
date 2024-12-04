import "./Tap.css";
import tabIcon1 from "../../assets/img/icon1.svg";
import tabIcon2 from "../../assets/img/icon2.svg";
import tabIcon3 from "../../assets/img/icon3.svg";
import tabIcon4 from "../../assets/img/icon4.svg";
import tabIcon5 from "../../assets/img/icon5.svg";

function Tap() {
  return (
    <>
      <section className="tab">
        <div className="tabBack">
          <div className="tabMenu" id="tabScreen">
            <div className="tabShot">
              <img src={tabIcon5}></img>
            </div>
          </div>
        </div>
        <div className="tabColor">
          <div className="tabIcon">
            <div className="tabMenu">
              <img src={tabIcon1}></img>
            </div>
            <div className="tabMenu">
              <img src={tabIcon2}></img>
            </div>
          </div>
          <div className="tabIcon">
            <div className="tabMenu">
              <img src={tabIcon3}></img>
            </div>
            <div className="tabMenu">
              <img src={tabIcon4}></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tap;
