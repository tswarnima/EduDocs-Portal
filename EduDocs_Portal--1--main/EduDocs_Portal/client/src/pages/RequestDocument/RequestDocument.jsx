import { useState } from "react";
import styles from "./RequestDocument.module.css";

import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import { submitDocumentRequest } from "../../api/requestDocument";
import { getStudentId } from "../../api/auth";

function RequestDocument() {
  const [formData, setFormData] = useState({
    documentType: "",
    semester: "",
    purpose: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentOptions = [
    "Bonafide Certificate",
    "Transcript",
    "Migration Certificate",
    "Character Certificate",
    "Degree Certificate",
    "Marksheet",
  ];

  const semesterOptions = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentId = getStudentId();

    if (!studentId) {
      setError("Please login or register before submitting a request.");
      return;
    }

    if (
      !formData.documentType ||
      !formData.semester ||
      !formData.purpose
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await submitDocumentRequest(studentId, formData);
      setSuccessMessage(`Request submitted successfully! Your Request ID is ${result.id}.`);
      setFormData({
        documentType: "",
        semester: "",
        purpose: "",
        notes: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.requestContainer}>
      <h1>Request Document</h1>
      <p className={styles.subtitle}>
        Fill in the details below to request your document.
      </p>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <form
        className={styles.requestForm}
        onSubmit={handleSubmit}
      >
        <Select
          label="Document Type"
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          options={documentOptions}
        />

        <Select
          label="Semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          options={semesterOptions}
        />

        <Input
          label="Purpose"
          type="text"
          placeholder="Enter purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <Input
          label="Additional Notes"
          type="text"
          placeholder="Any additional information"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}

export default RequestDocument;
