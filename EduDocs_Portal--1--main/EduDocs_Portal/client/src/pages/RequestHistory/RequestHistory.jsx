import { useState, useEffect } from "react";
import styles from "./RequestHistory.module.css";
import { getRequestHistory } from "../../api/requestHistory";
import { getStudentId } from "../../api/auth";

function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const studentId = getStudentId();

  useEffect(() => {
    if (!studentId) {
      return;
    }

    getRequestHistory(studentId)
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [studentId]);

  if (!studentId) {
    return (
      <div className={styles.historyContainer}>
        <h1>Request History</h1>
        <p className={styles.error}>Please login or register to view your request history.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.historyContainer}>
        <h1>Request History</h1>
        <p>Loading request history...</p>
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      <h1>Request History</h1>

      <p className={styles.subtitle}>
        View all your previous document requests.
      </p>

      {error && <p className={styles.error}>{error}</p>}

      {!error && requests.length === 0 && (
        <p className={styles.empty}>No requests found. Submit a document request to get started.</p>
      )}

      {!error && requests.length > 0 && (
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Document</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.document}</td>
                <td>{request.date}</td>

                <td>
                  <span
                    className={`${styles.status} ${
                      request.status === "Approved"
                        ? styles.approved
                        : request.status === "Pending"
                        ? styles.pending
                        : styles.rejected
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RequestHistory;
