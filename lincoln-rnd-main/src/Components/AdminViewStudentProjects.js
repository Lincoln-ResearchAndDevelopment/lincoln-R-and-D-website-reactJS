import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../Css/List.css";
import { API_ENDPOINT } from "./Config";
import { FaEllipsisV, FaTrash, FaEye, FaEyeSlash, FaInfoCircle, FaEdit } from "react-icons/fa";

function List() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [viewProject, setViewProject] = useState(null);
  const [editProject, setEditProject] = useState(null); // holds project for editing
  const [isSubmitting, setIsSubmitting] = useState(false);

  // fetchProjects - reusable so we can call after update/delete
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT + "student_projects.php");
      const result = await response.json();
      if (result.success) {
        setTableData(result.data);
        setError(null);
      } else {
        setError(result.message || "Failed to load data");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    const handler = () => fetchProjects();
    window.addEventListener("studentProjectUpdated", handler);
    return () => window.removeEventListener("studentProjectUpdated", handler);
  }, []);

  // Delete project function
  const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT + "student_projects.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: projectId }),
      });

      const result = await response.json();

      if (result.success) {
        // refresh list
        await fetchProjects();
        window.dispatchEvent(new Event("studentProjectUpdated"));
        alert("Project deleted successfully!");
      } else {
        alert("Failed to delete project: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred while deleting the project");
      console.error("Delete error:", error);
    }
  };

  // Toggle archive status function
  const toggleArchiveStatus = async (projectId, currentStatus) => {
    try {
      const response = await fetch(API_ENDPOINT + "student_projects.php", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: projectId, archive: currentStatus === 1 ? 0 : 1 }),
      });

      const result = await response.json();

      if (result.success) {
        setTableData(prevData =>
          prevData.map(project =>
            project.id === projectId ? { ...project, archive: currentStatus === 1 ? 0 : 1 } : project
          )
        );
        window.dispatchEvent(new Event("studentProjectUpdated"));
      } else {
        alert("Failed to update project status: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      alert("An error occurred while updating the project status");
      console.error("Archive toggle error:", error);
    }
  };

  // ---- Edit submit handler (multipart/form-data -> POST with action=update_project) ----
  const submitEdit = async (formState) => {
    // formState must include id
    if (!formState || !formState.id) {
      alert("Missing project id");
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("action", "update_project");
      fd.append("id", formState.id);
      fd.append("title", formState.title || "");
      fd.append("student", formState.student || "");
      fd.append("category", formState.category || "");
      fd.append("link", formState.link || "");

      // Only append files if provided (keeps old files otherwise)
      if (formState.imageFile instanceof File) {
        fd.append("image", formState.imageFile);
      }
      if (formState.documentFile instanceof File) {
        fd.append("document", formState.documentFile);
      }

      const response = await fetch(API_ENDPOINT + "student_projects.php", {
        method: "POST",
        body: fd,
      });

      const result = await response.json();

      if (result.success) {
        // refresh from server to get exact saved data (keeps server as source of truth)
        await fetchProjects();
        window.dispatchEvent(new Event("studentProjectUpdated"));
        setEditProject(null);
        alert("Project updated successfully!");
      } else {
        alert("Failed to update project: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating the project");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="content">
      <div className="listbody">
        <div className="list">
          <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#0f172a' }}>Student Projects</h1>
              <p style={{ color: '#64748b' }}>Manage and monitor all student research project submissions.</p>
            </div>
            <Link className="text-link" to="/admindash" style={{ 
              background: '#dc2626', 
              color: 'white', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '0.5rem', 
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              Back To Dashboard
            </Link>
          </header>

          {tableData.length > 0 ? (
            <div className="premium-table-wrapper">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Link</th>
                    <th>Document</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => {
                    const thumbnail = row.media?.length
                      ? API_ENDPOINT + row.media[0].url
                      : row.image
                      ? API_ENDPOINT + row.image
                      : null;

                    return (
                      <tr
                        key={rowIndex}
                        style={
                          row.archive === 1 ? { opacity: 0.6, background: "#f3f4f6" } : {}
                        }
                      >
                        <td>{row.title}</td>
                        <td>{row.student}</td>
                        <td>{row.category}</td>
                        <td>
                          {thumbnail ? (
                            <img
                              src={thumbnail}
                              alt={row.title}
                              style={{
                                width: 60,
                                height: 40,
                                objectFit: "cover",
                                cursor: "pointer",
                                borderRadius: 4,
                              }}
                              onClick={() => setModalImage(thumbnail)}
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td>
                          {row.link ? (
                            <a
                              href={row.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-link"
                              style={{
                                background: "#dc2626",
                                color: "#fff",
                                padding: "0.4rem 1rem",
                                borderRadius: "6px",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
                            >
                              Visit
                            </a>
                          ) : (
                            "No Link"
                          )}
                        </td>
                        <td>
                          {row.document ? (
                            <a
                              href={row.document.startsWith("http") ? row.document : API_ENDPOINT + row.document}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-link"
                              style={{
                                background: "#111827",
                                color: "#fff",
                                padding: "0.4rem 1rem",
                                borderRadius: "6px",
                                textDecoration: "none",
                                fontWeight: 600,
                              }}
                            >
                              View Document
                            </a>
                          ) : (
                            "No Document"
                          )}
                        </td>
                        <td>{row.created_at}</td>
                        <td>
                          <button
                            onClick={() => toggleArchiveStatus(row.id, row.archive)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.5rem",
                              borderRadius: "4px",
                            }}
                          >
                            {row.archive === 1 ? (
                              <>
                                <FaEyeSlash style={{ color: "#b91c1c" }} />
                                <span style={{ color: "#b91c1c", fontWeight: 700, fontSize: 13 }}>Inactive</span>
                              </>
                            ) : (
                              <>
                                <FaEye style={{ color: "#059669" }} />
                                <span style={{ color: "#059669", fontWeight: 700, fontSize: 13 }}>Active</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td style={{ position: "relative" }}>
                          <ActionMenu
                            rowIndex={rowIndex}
                            row={row}
                            onDelete={() => deleteProject(row.id)}
                            onView={() => setViewProject(row)}
                            onEdit={() => setEditProject(row)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data available</p>
          )}

          {/* Image Preview Modal */}
          {modalImage && (
            <div className="modal-overlay" onClick={() => setModalImage(null)}>
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

          {/* View Details Modal */}
          {viewProject && (
            <div className="modal-overlay" onClick={() => setViewProject(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "1rem", color: "#dc2626" }}>{viewProject.title}</h2>
                <p><strong>Student:</strong> {viewProject.student}</p>
                <p><strong>Category:</strong> {viewProject.category}</p>
                <p><strong>Created:</strong> {viewProject.created_at}</p>
                <p><strong>Link:</strong> {viewProject.link ? <a href={viewProject.link} target="_blank" rel="noreferrer">Visit Project</a> : "No link"}</p>
                <p><strong>Document:</strong> {viewProject.document ? <a href={API_ENDPOINT + viewProject.document} target="_blank" rel="noreferrer">View Document</a> : "No document"}</p>
                {viewProject.media && viewProject.media.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <h4>Media Files:</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {viewProject.media.map((file, idx) => (
                        <img
                          key={idx}
                          src={API_ENDPOINT + file.url}
                          alt=""
                          style={{
                            width: "100px",
                            height: "70px",
                            borderRadius: "6px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setViewProject(null)}
                  style={{
                    marginTop: "1.5rem",
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Edit Modal (polished) */}
          {editProject && (
            <EditModal
              project={editProject}
              onClose={() => setEditProject(null)}
              onSubmit={submitEdit}
              isSubmitting={isSubmitting}
              apiEndpoint={API_ENDPOINT}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ActionMenu component (View, Edit, Delete)
function ActionMenu({ rowIndex, row, onDelete, onView, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          borderRadius: "4px",
        }}
      >
        <FaEllipsisV />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            minWidth: "180px",
          }}
        >
          <button
            onClick={() => { onView(); setIsOpen(false); }}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#2563eb",
            }}
          >
            <FaInfoCircle /> View
          </button>

          <button
            onClick={() => { onEdit(); setIsOpen(false); }}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#059669",
            }}
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={() => { onDelete(); setIsOpen(false); }}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#dc2626",
            }}
          >
            <FaTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// EditModal component (polished)
function EditModal({ project, onClose, onSubmit, isSubmitting, apiEndpoint }) {
  const [form, setForm] = useState({
    id: project.id,
    title: project.title || "",
    student: project.student || "",
    category: project.category || "",
    link: project.link || "",
    // store files separately
    imageFile: null,
    documentFile: null,
    // preview
    currentImage: project.image ? (project.image.startsWith("http") ? project.image : apiEndpoint + project.image) : null,
    currentDocument: project.document ? project.document : null,
  });

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      id: project.id,
      title: project.title || "",
      student: project.student || "",
      category: project.category || "",
      link: project.link || "",
      currentImage: project.image ? (project.image.startsWith("http") ? project.image : apiEndpoint + project.image) : null,
      currentDocument: project.document ? project.document : null,
      imageFile: null,
      documentFile: null,
    }));
  }, [project, apiEndpoint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setForm(prev => ({
      ...prev,
      [name === "image" ? "imageFile" : "documentFile"]: file,
      // if image chosen, update preview using local URL
      currentImage: name === "image" ? URL.createObjectURL(file) : prev.currentImage,
      // document preview remains as filename (no client-side preview for documents)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.title.trim() || !form.student.trim()) {
      alert("Please provide title and student name.");
      return;
    }

    // build form state object for submitEdit wrapper
    const submitState = {
      id: form.id,
      title: form.title,
      student: form.student,
      category: form.category,
      link: form.link,
      imageFile: form.imageFile,
      documentFile: form.documentFile,
    };

    await onSubmit(submitState);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 700 }}>
        <h3 style={{ color: "#dc2626", marginBottom: "0.75rem" }}>Edit Project</h3>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.6rem" }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Title</label>
          <input name="title" value={form.title} onChange={handleChange} style={{ padding: "8px", borderRadius: 6, border: "1px solid #ddd" }} />

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Student</label>
              <input name="student" value={form.student} onChange={handleChange} style={{ padding: "8px", borderRadius: 6, border: "1px solid #ddd" }} />
            </div>
            <div style={{ width: 180 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Category</label>
              <input name="category" value={form.category} onChange={handleChange} style={{ padding: "8px", borderRadius: 6, border: "1px solid #ddd", width: "100%" }} />
            </div>
          </div>

          <label style={{ fontSize: 13, fontWeight: 600 }}>Link</label>
          <input name="link" value={form.link} onChange={handleChange} style={{ padding: "8px", borderRadius: 6, border: "1px solid #ddd" }} />

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: 6 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Image (optional)</label>
              <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
              {form.currentImage && (
                <div style={{ marginTop: 8 }}>
                  <small>Current:</small>
                  <div style={{ marginTop: 6 }}>
                    <img src={form.currentImage} alt="current" style={{ width: 160, height: 90, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }} />
                  </div>
                </div>
              )}
            </div>

            <div style={{ width: 260 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Document (optional)</label>
              <input type="file" name="document" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} />
              {form.currentDocument && (
                <div style={{ marginTop: 8 }}>
                  <small>Current:</small>
                  <div style={{ marginTop: 6, wordBreak: "break-all" }}>
                    <a href={form.currentDocument.startsWith("http") ? form.currentDocument : apiEndpoint + form.currentDocument} target="_blank" rel="noreferrer">
                      {form.currentDocument.split("/").pop()}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem", marginTop: 12 }}>
            <button type="button" onClick={onClose} style={{ background: "#ddd", border: "none", padding: "0.6rem 1rem", borderRadius: 6 }}>Cancel</button>
            <button type="submit" disabled={isSubmitting} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "0.6rem 1rem", borderRadius: 6 }}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default List;
