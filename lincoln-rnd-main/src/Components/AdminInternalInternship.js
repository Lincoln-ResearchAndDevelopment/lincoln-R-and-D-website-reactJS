import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/List.css";
import { API_ENDPOINT } from "./Config";

function List() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "admin_internal_internship.php");
        const result = await response.json();

        if (result.success) {
          setTableData(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isImage = (value) => {
    if (typeof value !== "string") return false;
    return value.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i);
  };

  // Open file directly in browser tab
  const handleViewLetter = (fileUrl) => {
    // Open the actual file directly in a new tab — browser decides how to render it
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="content">
      <div className="listbody">
        <div className="list">
          <div className="tabletop">
            <h3>Internal Internship Applicants</h3>
            <Link className="text-link button" to="/admindash">
              Back To Dashboard
            </Link>
          </div>

          {tableData.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(tableData[0]).map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.entries(row).map(([key, value], columnIndex) => {
                        let fileUrl = value;

                        if (key.toLowerCase().includes("letter") && value) {
                          if (!/^https?:\/\//i.test(value) && !value.startsWith("/")) {
                            fileUrl = API_ENDPOINT + value;
                          } else if (value.startsWith("/")) {
                            fileUrl = API_ENDPOINT.replace(/\/?$/, "") + value;
                          }

                          // Show button only if file type is valid
                          if (value.match(/\.(pdf|doc|docx|png|jpg|jpeg)$/i)) {
                            return (
                              <td key={columnIndex}>
                                <button
                                  onClick={() => handleViewLetter(fileUrl)}
                                  style={{
                                    backgroundColor: "#1976d2",
                                    color: "white",
                                    border: "none",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  View Letter
                                </button>
                              </td>
                            );
                          }
                        }

                        return (
                          <td key={columnIndex}>
                            {isImage(value) ? (
                              <img
                                src={value}
                                alt="preview"
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                  cursor: "pointer",
                                  border: "1px solid #ccc",
                                  borderRadius: 4,
                                }}
                                onClick={() => setModalImage(value)}
                              />
                            ) : (
                              value
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data available</p>
          )}

          {/* Modal for image preview */}
          {modalImage && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setModalImage(null)}
            >
              <img
                src={modalImage}
                alt="Preview"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  borderRadius: 8,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                  background: "#fff",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
