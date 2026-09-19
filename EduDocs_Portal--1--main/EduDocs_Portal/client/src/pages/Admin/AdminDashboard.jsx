import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import {
  getAdminRequests,
  getAdminRequestDetails,
  getAdminUsers,
  updateAdminRequestStatus,
  updateAdminUserStatus,
} from "../../api/admin";
import { getAdminEmail, logoutAdmin } from "../../api/auth";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const adminEmail = getAdminEmail();

  const loadRequests = async () => {
    const data = await getAdminRequests();
    setRequests(data);
  };

  const loadUsers = async () => {
    const data = await getAdminUsers();
    setUsers(data);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      try {
        await Promise.all([loadRequests(), loadUsers()]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const handleViewRequest = async (requestId) => {
    setMessage("");
    setError("");

    try {
      const details = await getAdminRequestDetails(requestId);
      setSelectedRequest(details);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    setMessage("");
    setError("");

    try {
      await updateAdminRequestStatus(requestId, status);
      await loadRequests();

      if (selectedRequest?.id === requestId) {
        const details = await getAdminRequestDetails(requestId);
        setSelectedRequest(details);
      }

      setMessage(`Request marked as ${status}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleUser = async (studentId, isActive) => {
    setMessage("");
    setError("");

    try {
      await updateAdminUserStatus(studentId, !isActive);
      await loadUsers();
      setMessage(`User ${!isActive ? "activated" : "deactivated"} successfully.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Approved") return styles.approved;
    if (status === "Rejected") return styles.rejected;
    return styles.pending;
  };

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <p className={styles.loading}>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Signed in as {adminEmail || "Administrator"}</p>
        </div>

        <div className={styles.headerActions}>
          <Link to="/" className={styles.portalLink}>Student Portal</Link>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === "requests" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          Document Requests
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === "users" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {activeTab === "requests" && (
        <div className={styles.panel}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Student ID</th>
                  <th>Document</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="6">No document requests found.</td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.studentId}</td>
                      <td>{request.document}</td>
                      <td>
                        <span className={`${styles.status} ${getStatusClass(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>{request.submittedOn}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            type="button"
                            className={styles.viewButton}
                            onClick={() => handleViewRequest(request.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className={styles.approveButton}
                            onClick={() => handleUpdateStatus(request.id, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className={styles.rejectButton}
                            onClick={() => handleUpdateStatus(request.id, "Rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {selectedRequest && (
            <div className={styles.detailsCard}>
              <h3>Request Details: {selectedRequest.id}</h3>
              <div className={styles.detailsGrid}>
                <p><strong>Student:</strong> {selectedRequest.studentName}</p>
                <p><strong>Student ID:</strong> {selectedRequest.studentId}</p>
                <p><strong>Email:</strong> {selectedRequest.studentEmail}</p>
                <p><strong>Document:</strong> {selectedRequest.document}</p>
                <p><strong>Type:</strong> {selectedRequest.documentType}</p>
                <p><strong>Semester:</strong> {selectedRequest.semester}</p>
                <p><strong>Purpose:</strong> {selectedRequest.purpose}</p>
                <p><strong>Notes:</strong> {selectedRequest.notes || "None"}</p>
                <p><strong>Status:</strong> {selectedRequest.status}</p>
                <p><strong>Expected Delivery:</strong> {selectedRequest.expectedDelivery}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className={styles.panel}>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.studentId}>
                      <td>{user.studentId}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.department || "-"}</td>
                      <td>
                        <span className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={user.isActive ? styles.deactivateButton : styles.activateButton}
                          onClick={() => handleToggleUser(user.studentId, user.isActive)}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
