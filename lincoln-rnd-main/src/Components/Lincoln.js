import React, { useState, useEffect } from "react";
import "../Css/Lincoln.css";
import { API_ENDPOINT } from "./Config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

// Floating bubbles overlay
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

// Modernized hero section
const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <h1>Research & Development Unit</h1>
      <h3>Lincoln College & Lincoln University</h3>
      <p>
        The R&D Unit is the driving force behind our commitment to academic
        excellence, innovation, and societal impact. We empower faculty and
        students to engage in impactful research across various disciplines.
      </p>
    </div>
  </section>
);

// Modernized mission/vision section
const MissionVision = () => (
  <section className="mission">
    <div className="mission-text">
      <h1>Mission</h1>
      <p>
        To advance the frontiers of knowledge, foster interdisciplinary
        collaborations, and contribute to global progress by providing a dynamic
        and innovative environment for impactful research.
      </p>
    </div>
    <div className="mission-text">
      <h1>Vision</h1>
      <p>
        To be a globally recognized center of excellence in research, known for
        pioneering discoveries, innovative solutions, and a commitment to
        addressing societal challenges.
      </p>
    </div>
  </section>
);

// Modernized expertise section
const Expertise = () => (
  <section
    className="pictures"
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "2.5rem",
      padding: "3rem 2rem",
      background: "var(--off-white)",
    }}
  >
    <div
      className="gallery-row"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.2rem",
        width: "100%",
      }}
    >
      <div className="gal gal-1"></div>
      <div className="gal gal-2"></div>
      <div className="gal gal-3"></div>
    </div>
    <div
      className="gallery-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.2rem",
        width: "100%",
      }}
    >
      <div className="gal gal-4">
        <h1>Expertise & Functionality</h1>
        <p>
          Our dedicated team of researchers brings diverse expertise across
          science, technology, management, and humanities. The R&D Unit is a
          dynamic hub for ideation, exploration, and innovation, integrating
          theory and practice to support groundbreaking research and empower
          students and staff.
        </p>
      </div>
      <div className="gal gal-5"></div>
    </div>
    <div
      className="gallery-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1.2rem",
        width: "100%",
      }}
    >
      <div className="gal gal-7"></div>
      <div className="gal gal-8"></div>
      <div className="gal gal-4">
        <div className="">
          <h1>What We Do</h1>
          <p>
            We facilitate research, foster innovation, and support the academic
            community in achieving excellence.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCardHead = () => (
  <div className="CardHead">Latest Student Projects</div>
);

// ✨ MODERN MODAL WITH SLIDER ✨
const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "650px",
          width: "90%",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          position: "relative",
          maxHeight: "88vh",
          overflowY: "auto",
          transform: "scale(1)",
          transition: "transform 0.25s ease-in-out",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.6rem",
            right: "0.8rem",
            fontSize: "1.3rem",
            color: "#fff",
            background: "rgba(220,38,38,0.9)",
            border: "none",
            cursor: "pointer",
            fontWeight: "700",
            zIndex: 10000,
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(150,20,20,1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(220,38,38,0.9)")
          }
        >
          ✕
        </button>

        {/* MEDIA CAROUSEL */}
        {project.media && project.media.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "1.5rem",
            }}
          >
            {project.media.map((item, idx) => (
              <SwiperSlide key={idx}>
                {item.type === "image" ? (
                  <img
                    src={API_ENDPOINT + item.url}
                    alt={`${project.title} - Slide ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <video
                    controls
                    style={{
                    
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      borderRadius: "8px",
                    }}
                  >
                    <source
                      src={API_ENDPOINT + item.url}
                      type={`video/${item.url.split(".").pop()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : project.image ? (
          <img
            src={API_ENDPOINT + project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "contain",
              borderRadius: "8px",
              marginBottom: "1.5rem",
            }}
          />
        ) : (
          <p>No media available for this project.</p>
        )}

        <div>
          <h2 style={{ marginBottom: "0.5rem", color: "#111827" }}>
            {project.title}
          </h2>
          <p style={{ color: "#dc2626", marginBottom: "1rem" }}>
            <strong>Student Name:</strong> {project.student}
          </p>

          <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
            {project.document && (
              <a
                href={API_ENDPOINT + project.document}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Download
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#111827",
                  color: "#fff",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Visit Link
              </a>
            )}
          </div>

          <div>
            <h4 style={{ textDecoration: "none", marginBottom: "0.5rem" }}>
              Abstract
            </h4>
            <p style={{ color: "#374151", lineHeight: "1.6" }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✨ MODERNIZED PROJECT GALLERY ✨
const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "student_projects.php");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        const all = Array.isArray(result.data) ? result.data : [];
        const active = all.filter((p) => !p.archive || p.archive === 0);
        const latestThree = active.slice(0, 3);
        setProjects(latestThree);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, []);

  if (!Array.isArray(projects) || projects.length === 0) {
    return <h3 className="card-body">No projects available</h3>;
  }

  return (
    <section className="project-pictures">
      {projects.map((project, index) => {
        const mediaCandidate =
          Array.isArray(project.media) && project.media.length > 0
            ? project.media.find((m) => m.type === "image") || project.media[0]
            : null;

        const thumb = mediaCandidate
          ? API_ENDPOINT + mediaCandidate.url
          : project.image
          ? API_ENDPOINT + project.image
          : null;

        return (
          <div
            key={index}
            className="p-sub-L"
            onClick={() => setSelectedProject(project)}
          >
            {thumb ? (
              <img className="p-img" src={thumb} alt={project.title} />
            ) : (
              <div
                className="p-img"
                style={{
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                No Image
              </div>
            )}
            <div className="p-h3">{project.title}</div>
            <div className="p-p">by {project.student}</div>
          </div>
        );
      })}
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

const UpgradedPartners = () => {
  const partners = [
    { id: 1, name: "NITDA", logo: require("../images/NITDA.png") },
    { id: 2, name: "NGOs", logo: require("../images/ngos.png") },
    { id: 3, name: "BOI", logo: require("../images/Boi.jpg") },
    { id: 4, name: "NSEL", logo: require("../images/nsel.jpg") },
  ];

  return (
    <section
      style={{
        // background: "rgba(17,24,39,0.95)",
        backdropFilter: "blur(5px)",
        color: "white",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "var(--primary-red)",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          borderBottom: "3px solid #dc2626",
          display: "inline-block",
          paddingBottom: "0.3rem",
          
          

        }}
      >
        Our Partners
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2.5rem",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {partners.map((p) => (
          <div
            key={p.id}
            style={{
              backgroundColor: "#ffffffb1",
              borderRadius: "1rem",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(220,38,38,0.6)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(220,38,38,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(220,38,38,0.6)";
            }}
          >
            <img
              src={p.logo}
              alt={p.name}
              style={{
                maxWidth: "120px",
                height: "auto",
                filter: "brightness(0.9)",
                transition: "filter 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter =
                  "drop-shadow(0 0 10px #dc2626) brightness(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "brightness(0.9)")
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const About = () => (
  <section
    className="about"
    style={{
      padding: "2.5rem 1rem",
    }}
  >
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: 220,
      }}
    >
      <img
        src={require("./linclogo.png")}
        alt="logo"
        style={{
          maxWidth: 400,
          width: "100%",
          borderRadius: "1.2rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        }}
      />
    </div>
    <div
      className="about-text"
      style={{
        flex: 2,
        minWidth: 220,
        maxWidth: 700,
        background: "rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        padding: "2rem 1.5rem",
        boxShadow: "var(--shadow)",
      }}
    >
      <h1
        style={{
          color: "var(--primary-red)",
          fontSize: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        About The R&D Unit
      </h1>
      <p
        style={{
          color: "var(--mid-gray)",
          fontSize: "1.05rem",
          marginBottom: "0.7rem",
        }}
      >
        In the dynamic realm of higher education, innovation serves as the
        heartbeat of progress. At Lincoln University and Lincoln College, we
        take pride in pushing the boundaries of knowledge and charting new
        territories of discovery. Our Research and Development Unit stands at
        the forefront of this intellectual frontier, a dynamic powerhouse
        dedicated to shaping the future of education, fostering groundbreaking
        research, and propelling our institutions into the vanguard of global
        academic excellence.
      </p>
      <p style={{ color: "var(--mid-gray)", fontSize: "1.05rem" }}>
        With an unwavering commitment to curiosity and exploration, the Research
        and Development Unit at Lincoln is not merely a department; it's an
        incubator of ideas, a crucible of innovation, and a catalyst for
        transformative change.
      </p>
    </div>
  </section>
);

function Lincoln() {
  const [showBubbles, setShowBubbles] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubbles(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showBubbles && <FloatingBubblesOverlay />}
      <div className="landing-maxwidth">
        <Hero />
        <MissionVision />
        <Expertise />
        <ProjectCardHead />
        <ProjectGallery />
        <About />
        {/* 🌟 Upgraded Partners Section moved below About */}
        <UpgradedPartners />
      </div>
    </>
  );
}

export default Lincoln;
