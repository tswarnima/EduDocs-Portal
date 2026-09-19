import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Login/Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { resetPassword } from "../../api/login";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";

  const [formData, setFormData] = useState({
    token: tokenFromUrl,
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.token.trim()) {
      setError("Reset token is required");
      return;
    }

    if (!formData.newPassword.trim()) {
      setError("New password is required");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(formData.token, formData.newPassword);
      setMessage(result.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        <div className={styles.leftContent}>
          <h1>Create New Password</h1>
          <p>
            Choose a strong password to secure your EduDocs Portal account.
          </p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <p className={styles.subtitle}>
            Enter your reset token and new password.
          </p>

          <Input
            label="Reset Token"
            type="text"
            placeholder="Paste reset token"
            name="token"
            value={formData.token}
            onChange={handleChange}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>

          <p className={styles.registerText}>
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
