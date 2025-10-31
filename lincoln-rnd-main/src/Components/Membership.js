import React from "react";
import { Link } from "react-router-dom";
import "../Css/Lincoln.css";

// Floating bubbles background
const FloatingBubbles = () => (
  <div className="floating-bubbles">
    {[...Array(12)].map((_, i) => (
      <span
        key={i}
        className={
          `bubble bubble-${i}` + (i % 2 === 0 ? " bubble-red" : " bubble-black")
        }
      >
        {" "}
      </span>
    ))}
  </div>
);

const FloatingBubblesOverlay = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255,255,255,0.85)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.5s",
    }}
  >
    <FloatingBubbles />
  </div>
);

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>RESEARCH AND DEVELOPMENT MEMBERSHIP</h1>
      </div>
    </div>
  );
};

const Options = () => {
  return (
    <div className="flex-container">
      <Link to="/membership/staffmembership" className="link-flex-box">
        <h3 className="link-flex-box-text">
          STAFF
          <br />
          MEMBERSHIP
        </h3>
        <i className="fa fa-user-plus fa-5x" aria-hidden="true"></i>

        <p>
          Click to Register{" "}
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </p>
      </Link>
      <Link to="/membership/studentmembership" className="link-flex-box">
        <h3 className="link-flex-box-text">
          STUDENT
          <br />
          MEMBERSHIP
        </h3>
        <i className="fa fa-user-plus fa-5x" aria-hidden="true"></i>

        <p>
          Click to Register{" "}
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </p>
      </Link>

      <Link to="/membership/externalmembership" className="link-flex-box">
        <h3 className="link-flex-box-text">
          EXTERNAL
          <br />
          MEMBERSHIP
        </h3>
        <i className="fa fa-user-plus fa-5x" aria-hidden="true"></i>

        <p>
          Click to Register{" "}
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </p>
      </Link>
    </div>
  );
};

function Membership() {
  const [showBubbles, setShowBubbles] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowBubbles(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showBubbles && <FloatingBubblesOverlay />}
      <Hero />
      <Options />
    </div>
  );
}

export default Membership;
