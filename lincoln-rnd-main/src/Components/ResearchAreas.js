import React from "react";
import { useNavigate } from "react-router-dom";
import linclogo from "./linclogo.png";

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
    <div
      style={{
        backgroundColor: "#dc2626",
        color: "#ffffff",
        padding: "6rem 2rem",
        textAlign: "center",
        backgroundImage: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
        boxShadow: "inset 0 -10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "800",
          marginBottom: "1.5rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Research & Development
      </h1>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "300",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6",
          color: "#f9fafb",
        }}
      >
        Our research spans a wide array of focus areas — from healthcare to
        security — built to solve the real problems of the modern world.
      </h3>
    </div>
  );
};

const Areas = () => {
  const navigate = useNavigate();

  const wrapper = {
    backgroundColor: "#f3f4f6",
    padding: "5rem 2rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  };

  const card = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "16px",
    borderLeft: "6px solid #dc2626",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "flex-start",
  };

  const hoverEffect = {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
  };

  const image = {
    width: "70px",
    height: "70px",
    objectFit: "contain",
    alignSelf: "flex-start",
  };

  const title = {
    fontSize: "1.4rem",
    color: "#111827",
    fontWeight: "700",
    margin: 0,
  };

  const text = {
    color: "#374151",
    lineHeight: "1.6",
    fontSize: "1rem",
    margin: 0,
  };

  const areas = [
    {
      title: "Healthcare",
      text: "Innovations to enhance medical treatments, healthcare systems, and public health initiatives.",
    },
    {
      title: "Agriculture",
      text: "Sustainable practices, precision farming, and tech-driven solutions for agricultural challenges.",
    },
    {
      title: "Security",
      text: "Research on cutting-edge security technologies and strategies to address contemporary threats.",
    },
    {
      title: "Environmental Business",
      text: "Sustainable business practices, renewable energy, and conservation-focused innovation.",
    },
    {
      title: "Technology",
      text: "AI, IoT, and digital innovation shaping the future of industries and education.",
    },
    {
      title: "Education",
      text: "Research to enhance teaching methods, edtech solutions, and student outcomes.",
    },
  ];

  return (
    <div style={wrapper}>
      {areas.map((item, index) => (
        <div
          key={index}
          style={card}
          onClick={() =>
            navigate(`/projectlist/${encodeURIComponent(item.title)}`)
          }
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, hoverEffect);
            e.currentTarget.style.cursor = "pointer";
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, card);
            e.currentTarget.style.cursor = "default";
          }}
        >
          <img src={linclogo} alt="logo" style={image} />
          <h2 style={title}>{item.title}</h2>
          <p style={text}>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

const ResearchAreas = () => {
  const [showBubbles, setShowBubbles] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowBubbles(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#ffffff" }}>
      {showBubbles && <FloatingBubblesOverlay />}
      <Hero />
      <Areas />
    </div>
  );
};

export default ResearchAreas;
