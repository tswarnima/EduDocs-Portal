import { useState } from "react";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/login";
import { saveStudentId, saveStudentToken } from "../../api/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const user = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      saveStudentId(user.studentId);
      saveStudentToken(user.token);
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
         <div className={styles.leftContent}>
            <h1>Welcome Back!</h1>
            <p>
              Access your academic documents securely,
              track requests, and manage everything
              from one place.
           </p>
          </div>
      </div>

      <div className={styles.rightSection}>
          <form
              className={styles.formContainer}
              onSubmit={handleSubmit}
          >
            <h2>Login to Your Account</h2>

            <p className={styles.subtitle}>
              Enter your credentials to continue.
            </p>

            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

            {errors.email && (
              <p className={styles.error}>{errors.email}</p>
            )}

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}

            {submitError && (
              <p className={styles.error}>{submitError}</p>
            )}

            <div className={styles.options}>
              <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                />
                    Remember Me
              </label>

              <Link to="/forgot-password">Forgot Password</Link>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <p className={styles.registerText}>
              Don't have an account?
              <Link to="/register">
                Register
              </Link>
            </p>
          </form>
      </div>
    </div>
  );
}

export default Login;
