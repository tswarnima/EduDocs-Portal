import { useState } from "react";
import styles from "./TrackRequest.module.css";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { trackRequestById } from "../../api/trackRequest";

function TrackRequest() {
  const [requestId, setRequestId] = useState("");
  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setRequestId(e.target.value);
    setError("");
    setRequest(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requestId.trim()) {
      setError("Please enter Request ID.");
      return;
    }

    setIsLoading(true);
    setError("");
    setRequest(null);

    try {
      const foundRequest = await trackRequestById(requestId.trim());
      setRequest(foundRequest);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.trackContainer}>
      <h1>Track Request</h1>

      <p className={styles.subtitle}>
        Enter your Request ID to check the current status of your document request.
      </p>

      <form className={styles.trackForm} onSubmit={handleSubmit}>
        <Input
          label="Request ID"
          type="text"
          placeholder="Enter Request ID"
          name="requestId"
          value={requestId}
          onChange={handleChange}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Tracking..." : "Track Request"}
        </Button>
      </form>

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}

      {request && (
        <div className={styles.statusCard}>
          <h2>Request Status</h2>

          <p>
            <strong>Request ID:</strong> {request.id}
          </p>

          <p>
            <strong>Document:</strong> {request.document}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                request.status === "Approved"
                  ? styles.approved
                  : request.status === "Pending"
                    ? styles.pending
                    : styles.rejected
              }
            >
              {request.status}
            </span>
          </p>

          <p>
            <strong>Submitted On:</strong> {request.submittedOn}
          </p>

          <p>
            <strong>Expected Delivery:</strong> {request.expectedDelivery}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrackRequest;
