import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { loginAdmin } from "../../api/admin";
import { saveAdminEmail, saveAdminToken } from "../../api/auth";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const admin = await loginAdmin(formData);
      saveAdminToken(admin.token);
      saveAdminEmail(admin.email);
      navigate("/admin/dashboard");
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
          <h1>Admin Portal</h1>
          <p>
            Authorized administrators can review document requests,
            manage users, and update request statuses.
          </p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <p className={styles.subtitle}>
            Admin accounts are provisioned by the system administrator.
          </p>

          <Input
            label="Admin Email"
            type="email"
            placeholder="Enter admin email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter admin password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login as Admin"}
          </Button>

          <p className={styles.registerText}>
            <Link to="/">Back to Student Portal</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
