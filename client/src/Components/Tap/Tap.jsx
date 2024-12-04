import "./Tap.css";
import { Home, Location, QR, Stamp, Human } from "../../assets/img/Tab/Tab_image";

function Tap() {
  return (
    <>
      <section className="tab">
        <div className="tabInnerWrap">
          <section className="tabScreenWrap">
            <div className="tabScreen">
              <img src={QR} alt="QR Code" />
            </div>
          </section>
          <section className="tabIconWrap">
            <div className="tabIcon">
              <div>
                <img src={Home} alt="Home Icon" />
              </div>
              <div>
                <img src={Location} alt="Location Icon" />
              </div>
            </div>
            <div className="tabIcon">
              <div>
                <img src={Human} alt="Human Icon" />
              </div>
              <div>
                <img src={Stamp} alt="Stamp Icon" />
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Tap;
