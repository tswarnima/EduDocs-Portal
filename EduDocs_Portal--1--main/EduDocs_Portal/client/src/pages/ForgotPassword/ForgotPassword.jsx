import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Login/Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { forgotPassword } from "../../api/login";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setResetToken("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await forgotPassword(email);
      setMessage(result.message);

      if (result.resetToken) {
        setResetToken(result.resetToken);
      }
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
          <h1>Reset Password</h1>
          <p>
            Enter your registered email and we will help you regain access
            to your account.
          </p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <p className={styles.subtitle}>
            We will generate a reset token for your account.
          </p>

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}

          {resetToken && (
            <p className={styles.info}>
              Use this reset token:
              {" "}
              <Link to={`/reset-password?token=${resetToken}`}>
                Reset your password
              </Link>
            </p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send Reset Link"}
          </Button>

          <p className={styles.registerText}>
            Remember your password?
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
