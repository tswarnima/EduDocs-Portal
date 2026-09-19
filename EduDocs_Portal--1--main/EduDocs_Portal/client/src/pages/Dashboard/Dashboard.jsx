import { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaHistory,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import styles from "./Dashboard.module.css";
import { getDashboardSummary } from "../../api/dashboard";
import { logoutStudent } from "../../api/auth";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardSummary()
      .then((data) => setDashboardData(data))
      .catch((err) => {
        if (err.message.includes("Authentication") || err.message.includes("session")) {
          logoutStudent();
          navigate("/login");
          return;
        }
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <main className={styles.dashboard}>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.dashboard}>
        <p className={styles.error}>{error}</p>
      </main>
    );
  }

  return (
    <main className={styles.dashboard}>
      <h1>{dashboardData?.welcomeMessage || "Welcome Back!"}</h1>

      <p className={styles.subtitle}>
        Manage your academic documents from one place.
      </p>

      {dashboardData?.stats && (
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span>Total Requests</span>
            <strong>{dashboardData.stats.total}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Pending</span>
            <strong>{dashboardData.stats.Pending}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Approved</span>
            <strong>{dashboardData.stats.Approved}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Rejected</span>
            <strong>{dashboardData.stats.Rejected}</strong>
          </div>
        </div>
      )}

      <div className={styles.cardContainer}>
        <DashboardCard
          icon={<FaFileAlt />}
          title="Request Document"
          description="Submit a new document request."
          onClick={() => navigate("/request-document")}
        />

        <DashboardCard
          icon={<FaSearch />}
          title="Track Request"
          description="Track your submitted requests."
          onClick={() => navigate("/track-request")}
        />

        <DashboardCard
          icon={<FaHistory />}
          title="Request History"
          description="View all previous requests."
          onClick={() => navigate("/request-history")}
        />

        <DashboardCard
          icon={<FaUser />}
          title="Profile"
          description="Manage your account."
          onClick={() => navigate("/profile")}
        />
      </div>

      {dashboardData?.recentRequests?.length > 0 && (
        <section className={styles.recentSection}>
          <h2>Recent Requests</h2>
          <ul>
            {dashboardData.recentRequests.map((request) => (
              <li key={request.id}>
                <span>{request.document}</span>
                <span>{request.status}</span>
                <span>{request.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Dashboard;
